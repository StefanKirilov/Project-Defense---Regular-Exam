const Booking = require('../models/Booking');
const User = require('../models/User');

exports.getAll = () => Booking.find();

exports.create = (bookingData) => Booking.create(bookingData);

exports.getOne = (bookingId) => Booking.findById(bookingId);

exports.update = (bookingId,bookingData) => Booking.findByIdAndUpdate(bookingId,bookingData);

exports.delete = (bookingId) => Booking.findByIdAndDelete(bookingId);

exports.like = async (bookingId, userId) =>{
    const house = await Booking.findById(bookingId);
    // const user = await User.findById(userId);

    house.likes.push(userId);
    // user.likedHouses.push(bookingId);

    await house.save();
    // await user.save();

    return;
};

exports.unlike = async (bookingId, userId) =>{
    const house = await Booking.findById(bookingId);
    // const user = await User.findById(userId);

    house.likes.pull(userId);
    // user.likedHouses.pull(bookingId);

    await house.save();
    // await user.save();

    return;
};

exports.addComment = async (bookingId, commentData) =>{
    const house = await Booking.findById(bookingId);
    house.commentList.push(commentData);
    await house.save();

    return house;
};


exports.deleteComment = async (bookingId, commentId) =>{
    const house = await Booking.findById(bookingId);
    const comment = house.commentList.filter(x => x._id.toString() === commentId)[0];
    
    house.commentList.pull(comment);
    await house.save();

    return house;
};
