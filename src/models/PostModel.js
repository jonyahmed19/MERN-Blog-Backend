const mongoose = require('mongoose');


const postSchema = mongoose.Schema(
    {
        title: {
           type: String,
            required: true
        },
        slug: {
          type: String,
            unique: true,

        },
        excerpt: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now()
        }

    }, { versionKey: false }
)

const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;