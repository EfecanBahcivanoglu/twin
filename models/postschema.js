const mongoose = require('mongoose');

const PostSchema = mongoose.Schema ({
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
        type: String,
        required: true
    }


});

module.exports = mongoose.model('Posts', PostSchema);