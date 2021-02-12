const express = require('express');
const router = new express.Router();


router.get('/', (req, res) => {
    return res.json({items});
})


router.post('/', function createNewItem(req, res) {
    console.log(req);
    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem);
    return res.status(201).json({item: newItem});
})


// router.post('/post_test', function testPost(req, res) {
//     console.log(req.body);
//     res.send(items);
// })

router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if(foundItem === undefined) {
        throw error;
    }
    res.json({item: foundItem});
})



router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if(foundItem === undefined) {
        throw error;
    }
    foundItem.name = req.body.name;
    res.json({item: foundItem});
})

router.delete('/:name', (req, res) => {
    const foundItem = items.findIndex(item => item.name === req.params.name);
    if(foundItem === -1) {
        throw error;
    }
    foundItem.splice(foundItem, 1);
    res.json({message: "Deleted"});
})



module.exports = router;