const jwt = require('jsonwebtoken');

module.exports = async function Verify(req,res,next) {
    const token = req.header('x-access-token');

    if (!token) {
        return res.json({
            res: true,
            auth: false,
        })
    }

    const verify = await jwt.decode(token);
    console.log(verify);

    if (!verify) {
        return res.json({
            res: true,
            auth: false,
        })
    }

    req.user = verify.id;
    next();
}