const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const port = 1245;

// Redis client setup
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Data: list of products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Data access: getItemById function
function getItemById(id) {
  return listProducts.find((product) => product.itemId === id);
}

// Server: GET /list_products route
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// In stock in Redis: reserveStockById and getCurrentReservedStockById functions
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return parseInt(reservedStock) || 0;
}

// Server: GET /list_products/:itemId route
app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(parseInt(itemId));
  if (item) {
    const currentQuantity = item.initialAvailableQuantity - (await getCurrentReservedStockById(itemId));
    res.json({ ...item, currentQuantity });
  } else {
    res.json({ status: 'Product not found' });
  }
});

// Server: GET /reserve_product/:itemId route
app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(parseInt(itemId));
  if (!item) {
    res.json({ status: 'Product not found' });
  } else {
    const currentQuantity = item.initialAvailableQuantity - (await getCurrentReservedStockById(itemId));
    if (currentQuantity <= 0) {
      res.json({ status: 'Not enough stock available', itemId: item.itemId });
    } else {
      await reserveStockById(itemId, currentQuantity - 1);
      res.json({ status: 'Reservation confirmed', itemId: item.itemId });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

