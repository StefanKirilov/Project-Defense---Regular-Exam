const router = require('express').Router();
const bookingService = require('../services/bookingService');

router.get('/',async (req, res) => {
    const bookings = await bookingService.getAll();

    res.json(bookings);
});

router.post('/',async (req, res) => {
    const bookingData = req.body;
    // const user = req.cookies["auth"]?._id;
    const bookings = await bookingService.create({...bookingData, owner: req.cookies.auth._id});

    res.json(bookings);
});

router.get('/:bookingId',async (req, res) => {
    const bookingId = req.params.bookingId;
    const booking = await bookingService.getOne(bookingId);

    res.json(booking);
});

router.put('/:bookingId',async (req, res) => {
    const bookingId = req.params.bookingId;
    const bookingData = req.body;
    const booking = await bookingService.update(bookingId, bookingData);

    res.json(booking);
});

router.delete('/:bookingId',async (req, res) => {
    const bookingId = req.params.bookingId;
    await bookingService.delete(bookingId);

    res.status(204).json({ok: true});
});

router.get('/:bookingId/like', async (req, res) => {

    const bookingId = req.params.bookingId;
    const userId = req.cookies["auth"]?._id;

    try {
        await bookingService.like(bookingId, userId);
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/:bookingId/unlike', async (req, res) => {

    const bookingId = req.params.bookingId;
    const userId = req.cookies["auth"]?._id;

    try {
        await bookingService.unlike(bookingId, userId);
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/:bookingId/comments', async (req, res) => {
    const bookingId = req.params.bookingId;
    const { comment, username } = req.body;
    const user = req.cookies["auth"]?._id;
    const date = new Date().toISOString();

    try {
        await bookingService.addComment(bookingId, { user , comment, username, date});
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/:bookingId/deleteComment', async (req, res) => {

    const bookingId = req.params.bookingId;
    const { elementId } = req.body;
    try {
        await bookingService.deleteComment(bookingId, elementId);
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});



module.exports = router;