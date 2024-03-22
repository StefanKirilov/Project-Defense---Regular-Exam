const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name should be minimum 3 characters long'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [3, 'Location should be minimum 3 characters long'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        minLength: [8, 'Phone should be minimum 8 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description should be minimum 10 characters long'],
    },
    price: {
        type: String,
        required: [true, 'Price is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    // rent: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    // }],
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    commentList: [
        {
            user: {
               type: mongoose.Types.ObjectId,
               required: true,
               ref: 'User',
            },
            username: {
                type: String,
             },
            comment: {
                type: String,
                required: [true, 'Comment is required'],
            },
            date: {
                type: String,
            },
        }
    ],
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;