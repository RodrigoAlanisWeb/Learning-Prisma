const { Router } = require('express');
const router = Router();
const prisma = require('../db');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

router.post('/user', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        });
        const token = await jwt.sign({ id: user.id }, "secret", {
            expiresIn: 60 * 60 * 60 * 24
        });
        return res.json({
            res: true,
            token
        })
    } catch (error) {
        return res.json({
            res: false,
        })
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        });
        console.log(user);
        if (user.password != req.body.password) {
            return res.json({
                res: true,
                auth: false
            });
        }

        const token = await jwt.sign({ id: user.id }, "secret", {
            expiresIn: 60 * 60 * 60 * 24
        });

        return res.json({
            res: true,
            token
        })
    } catch (error) {
        console.log(error);
        return res.json({
            res: false,
        })
    }
});

router.get('/user',verifyToken,async (req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user
            }
        });

        return res.json({
            res: true,
            auth: true,
            user
        })
    } catch (error) {
        return res.json({
            res: false,
        })
    }
})

module.exports = router;