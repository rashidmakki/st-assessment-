const express = require('express');
const router = express.Router();
const {createItem, getAllItems, getItemById, updateItem, deleteItem} = require('../controller/item.controller');

router.route('/').post(createItem).get(getAllItems)
router.route('/:id').get(getItemById).put(updateItem).delete(deleteItem)

module.exports = router;
