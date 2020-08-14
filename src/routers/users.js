const express = require('express');
const router = express.Router();
const User = require('../models/User');
//const user = require('../models/User');

router.get('/', async(req, res) => {
    const users = await User.find();
    res.json(users);
});
router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});
router.post('/', async(req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({
        status: 'user created'
    });
});
router.put('/:id', async(req, res) => {
    await user.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'user upload'
    });
});
router.delete('/:id', async(req, res) => {
    await user.findByIdAndDelete(req.params.id, req.body);
    res.json({
        status: 'user deleted'
    });
});

module.exports = router;
