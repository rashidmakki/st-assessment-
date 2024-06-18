const ItemModel = require('../model/tgroup.model');

const createItem = async (itemData) => {
  try {
    const item = await ItemModel.create(itemData);
    return item;
  } catch (error) {
    throw new Error('Error creating item: ' + error.message);
  }
};

const getAllItems = async () => {
  try {
    const items = await ItemModel.findAll();
    return items;
  } catch (error) {
    throw new Error('Error fetching items: ' + error.message);
  }
};

const getItemById = async (itemId) => {
  try {
    const item = await ItemModel.findByPk(itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  } catch (error) {
    throw new Error('Error fetching item by ID: ' + error.message);
  }
};

const findItemByCondition = async (condition) => {
  try {
    const item = await ItemModel.findOne({
      where:condition
    });
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  } catch (error) {
    throw new Error('Error fetching item by condition: ' + error.message);
  }
};

const updateItem = async (itemId, itemData) => {
  try {
    const item = await ItemModel.findByPk(itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    await item.update(itemData);
    return item;
  } catch (error) {
    throw new Error('Error updating item: ' + error.message);
  }
};

const deleteItem = async (itemId) => {
  try {
    const item = await ItemModel.findByPk(itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    await item.destroy();
  } catch (error) {
    throw new Error('Error deleting item: ' + error.message);
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  findItemByCondition
};
