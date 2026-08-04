const cron = require('node-cron');
const db = require('./db');

function initCronJobs(io) {
  // Check for expired stock daily at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      const [result] = await db.query(
        `UPDATE inventory_batches 
         SET status = 'EXPIRED' 
         WHERE expiration_date < CURDATE() AND status = 'ACTIVE'`
      );

      if (result.affectedRows > 0) {
        // Alert owner and inventory terminals
        io.emit('inventory:expired_alert', {
          message: `${result.affectedRows} inventory batches have expired and need to be discarded!`
        });
      }
    } catch (err) {
      console.error('Cron job error:', err);
    }
  });
}

module.exports = initCronJobs;
