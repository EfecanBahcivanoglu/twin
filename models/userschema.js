const mongoose = require('mongoose');


const userSchema = mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    nickname: {
        type: String,
        unique: true,
        minlength: 4,
        maxlength: 15,
        required: true
    },

    activityStatus: {
        type: Boolean,
        default: true

    }



});

module.exports = mongoose.model('Users', userSchema);