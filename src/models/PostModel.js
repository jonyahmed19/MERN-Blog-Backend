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
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users"
        },
        createdDate: {
            type: Date,
            default: Date.now()
        }

    }, { versionKey: false }
)

const postModel = mongoose.model('Posts', postSchema);

module.exports = postModel;