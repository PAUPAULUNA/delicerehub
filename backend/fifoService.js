const db = require('./db');

async function deductInventoryFIFO(menuItemId, quantityOrdered, connection) {
  // Get recipe for this menu item
  const [recipeItems] = await connection.query(
    'SELECT ingredient_id, amount_required FROM recipes WHERE menu_item_id = ?',
    [menuItemId]
  );

  for (const item of recipeItems) {
    let needed = item.amount_required * quantityOrdered;

    // Fetch active batches ordered by expiration date (FIFO)
    const [batches] = await connection.query(
      `SELECT id, quantity_remaining 
       FROM inventory_batches 
       WHERE ingredient_id = ? AND status = 'ACTIVE' AND expiration_date >= CURDATE() 
       ORDER BY expiration_date ASC`,
      [item.ingredient_id]
    );

    for (const batch of batches) {
      if (needed <= 0) break;

      const available = parseFloat(batch.quantity_remaining);
      if (available >= needed) {
        const remaining = available - needed;
        const newStatus = remaining === 0 ? 'DEPLETED' : 'ACTIVE';
        await connection.query(
          'UPDATE inventory_batches SET quantity_remaining = ?, status = ? WHERE id = ?',
          [remaining, newStatus, batch.id]
        );
        needed = 0;
      } else {
        // Use all of this batch and continue to next
        needed -= available;
        await connection.query(
          "UPDATE inventory_batches SET quantity_remaining = 0, status = 'DEPLETED' WHERE id = ?",
          [batch.id]
        );
      }
    }

    if (needed > 0) {
      throw new Error(`Insufficient stock for ingredient ID: ${item.ingredient_id}`);
    }
  }
}

module.exports = { deductInventoryFIFO };
