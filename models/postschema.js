const mongoose = require('mongoose');

const postSchema = mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }


});

module.exports = mongoose.model('Posts', postSchema);