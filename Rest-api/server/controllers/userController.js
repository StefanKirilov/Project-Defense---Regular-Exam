const router = require('express').Router();
const userService = require('../services/userService');

router.post('/register',async (req, res) => {
    const userData = req.body;

    const token = await userService.register(userData);

    res.cookie('auth', token, { httpOnly: true });

    res.json(token);
});

router.post('/login',async (req, res) => {
    const userData = req.body;
    const token = await userService.login(userData);

    res.cookie('auth', token, { httpOnly: true });

    res.json(token);
});

router.post('/logout',async (req, res) => {

    res.clearCookie('auth');

    res.json({ok: true});
});

router.get('/profile', async (req, res, next) => {
    let id = req.cookies["auth"]?._id;
    userService.getProfile(id)
    .then(user => { res.status(200).json(user) })
    .catch(next);
    
});

router.put('/profile', async (req, res, next) => {
    let id = req.cookies["auth"]?._id;
    const { email, username } = req.body;

    const token = await userService.updateProfile(id, email, username);

    res.cookie('auth', token, { httpOnly: true })
    res.json(token);
    
});



module.exports = router;