const itemService = require('../service/item.service');

// Create Item
const createItem = async (req, res) => {
  try {
    const itemData = req.body;
    const newItem = await itemService.createItem(itemData);
    return res.json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Items
const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    return res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Item by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemService.getItemById(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.json(item);
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const itemData = req.body;

    const updatedItem = await itemService.updateItem(id, itemData);
    return res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await itemService.deleteItem(id);
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
