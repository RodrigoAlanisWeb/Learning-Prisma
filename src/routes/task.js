const { Router } = require('express');
const router = Router();
const prisma = require('../db');
const verifyToken = require('../verifyToken');

router.post('/task',verifyToken,async (req,res) => {
    try {
        await prisma.task.create({
            data: {
                name: req.body.name,
                content: req.body.content,
                authorid: req.user
            }
        })
        return res.json({
            res: true
        })
    } catch (error) {
        return res.json({
            res: false,
        })
    }
});

router.get('/tasks',verifyToken,async (req,res) => {
    try {
        const tasks = await prisma.task.findMany({
            where:{
                authorid: req.user
            },
            orderBy: {
                name: 'desc'
            },
            include: {
                author: true
            }
        });
        return res.json({
            res: true,
            tasks
        })
    } catch (error) {
        return res.json({
            res: false,
        })
    }
});



module.exports = router;