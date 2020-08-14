const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const task = require('../models/Task');
router.get('/', async (req, res) => {
    const tasks = await Task.find().sort();
    //console.log(tasks);
    res.json(tasks);
});
router.get('/:id', async (req, res)=>{
   const task = await Task.findById(req.params.id);
   res.json(task);

});
router.post('/', async (req , res) =>{
    const task = new Task(req.body);
    await task.save();
    //console.log(task);
    res.json({
        status: 'Task saved'
    });
});
router.put('/:id', async (req, res)=>{
    console.log(req.params, req.body);
    await task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'task Upload'
    });
});
router.delete('/:id', async (req, res)=>{
    await task.findByIdAndDelete(req.params.id);
    res.json({
        status: 'task deleted'
    });
});

module.exports = router;
