const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./db');
const { deductInventoryFIFO } = require('./fifoService');
const { getSimilarProductReferral } = require('./recommenderService');
const initCronJobs = require('./cronJobs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Initialize background tasks
initCronJobs(io);

// Real-Time Socket Connection
io.on('connection', (socket) => {
  console.log('Terminal connected:', socket.id);
});

// --- API ENDPOINTS ---

// 1. Get Menu & Stock Availability
app.get('/api/menu', async (req, res) => {
  try {
    const [items] = await db.query('SELECT * FROM menu_items WHERE is_active = TRUE');
    const enrichedMenu = [];

    for (let item of items) {
      // Check stock availability
      const [recipes] = await db.query('SELECT ingredient_id, amount_required FROM recipes WHERE menu_item_id = ?', [item.id]);
      let isAvailable = true;

      for (let r of recipes) {
        const [stock] = await db.query(
          `SELECT SUM(quantity_remaining) as total FROM inventory_batches 
           WHERE ingredient_id = ? AND status = 'ACTIVE' AND expiration_date >= CURDATE()`,
          [r.ingredient_id]
        );
        if (!stock[0].total || stock[0].total < r.amount_required) {
          isAvailable = false;
          break;
        }
      }
      enrichedMenu.push({ ...item, isAvailable });
    }

    res.json(enrichedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Deep Learning Recommendation for Out-Of-Stock Item
app.get('/api/recommendations/:itemId', async (req, res) => {
  try {
    const referrals = await getSimilarProductReferral(req.params.itemId);
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Estimate Order Wait Time
app.get('/api/wait-time', async (req, res) => {
  try {
    const [activeOrders] = await db.query(
      `SELECT SUM(mi.prep_time_minutes * oi.quantity) as total_time 
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN menu_items mi ON oi.menu_item_id = mi.id
       WHERE o.status IN ('PENDING', 'PREPARING')`
    );
    
    // Assume 2 active kitchen staff as baseline divider
    const estimatedMinutes = Math.ceil((activeOrders[0].total_time || 0) / 2);
    res.json({ estimatedMinutes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Create Order & Process Real-Time Dispatch (Terminals 1 -> 2 -> 3)
app.post('/api/orders', async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { items, totalAmount } = req.body; // items: [{ menuItemId, quantity, price }]

    const [orderResult] = await connection.query(
      'INSERT INTO orders (status, total_amount) VALUES ("PENDING", ?)',
      [totalAmount]
    );
    const orderId = orderResult.insertId;

    for (let item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.menuItemId, item.quantity, item.price]
      );

      // Trigger FIFO Deduction immediately
      await deductInventoryFIFO(item.menuItemId, item.quantity, connection);
    }

    await connection.commit();

    // Broadcast Socket Events to Terminals
    io.emit('order:created', { orderId, items, status: 'PENDING' });
    io.emit('inventory:updated');

    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (err) {
    await connection.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

// 5. Shift Management API
app.get('/api/shifts', async (req, res) => {
  const [shifts] = await db.query(
    `SELECT s.*, u.name as employee_name FROM shifts s JOIN users u ON s.user_id = u.id`
  );
  res.json(shifts);
});

server.listen(process.env.PORT, () => {
  console.log(`Delicere server running on port ${process.env.PORT}`);
});
