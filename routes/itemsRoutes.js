const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();


router.get('/', function showAllItems(req, res) {
    return res.json({items});
})


router.post('/', function createNewItem(req, res, next) {
    try {
    if(!req.body.name || !req.body.price) throw new ExpressError("Please provide complete data", 400);
    const existingItem = items.find(item => item.name === req.body.name);
    if(existingItem) throw new ExpressError("Item already exists", 400);
    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem);
    return res.status(201).json({item: newItem});
    } catch(e) {
        return next(e);
    }
});



// router.post('/post_test', function testPost(req, res) {
//     console.log(req.body);
//     res.send(items);
// })

router.get('/:name', function showOneItem(req, res) {
    const foundItem = items.find(item => item.name === req.params.name);
    if(foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    res.json({item: foundItem});
})



router.patch('/:name', function patchItem(req, res) {
    const foundItem = items.find(item => item.name === req.params.name);
    if(foundItem === undefined) {
        throw error;
    }
    foundItem.name = req.body.name;
    res.json({item: foundItem});
})

router.delete('/:name', function deleteItem(req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name);
    console.log(foundItem);
    if(foundItem === -1) {
        throw error;
    }
    foundItem.splice(foundItem, 1);
    res.json({message: "Deleted"});
})



module.exports = router;