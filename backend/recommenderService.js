const tf = require('@tensorflow/tfjs-node');
const db = require('./db');

// Calculate Cosine Similarity between two tensors
function cosineSimilarity(vectorA, vectorB) {
  return tf.tidy(() => {
    const a = tf.tensor1d(vectorA);
    const b = tf.tensor1d(vectorB);
    const dotProduct = tf.sum(tf.mul(a, b));
    const normA = tf.norm(a);
    const normB = tf.norm(b);
    return dotProduct.div(tf.mul(normA, normB)).dataSync()[0];
  });
}

async function getSimilarProductReferral(outOfStockItemId) {
  const [items] = await db.query('SELECT id, name, price, feature_vector FROM menu_items WHERE is_active = TRUE');
  
  const targetItem = items.find(i => i.id === parseInt(outOfStockItemId));
  if (!targetItem || !targetItem.feature_vector) return [];

  const targetVector = typeof targetItem.feature_vector === 'string' 
    ? JSON.parse(targetItem.feature_vector) 
    : targetItem.feature_vector;

  const recommendations = [];

  for (const item of items) {
    if (item.id === targetItem.id) continue;
    
    const itemVector = typeof item.feature_vector === 'string'
      ? JSON.parse(item.feature_vector)
      : item.feature_vector;

    if (itemVector) {
      const similarity = cosineSimilarity(targetVector, itemVector);
      recommendations.push({ item, similarity });
    }
  }

  // Sort by highest similarity score
  recommendations.sort((a, b) => b.similarity - a.similarity);
  return recommendations.slice(0, 3).map(r => r.item);
}

module.exports = { getSimilarProductReferral };
