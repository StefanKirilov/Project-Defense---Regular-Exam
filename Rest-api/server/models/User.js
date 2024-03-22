const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    likedHouses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    }],
    // myHouses: [{
    //     type: {},
    //     ref: 'Hotel'
    // }],
    // bookedHouses: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Hotel'
    // }],
});

userSchema.pre ('save',async function() {
    this.password = await bcrypt.hash(this.password, 12);
})

const User = mongoose.model('User', userSchema);

module.exports = User;