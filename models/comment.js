//comment schema and comment properties

const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    author:{ type: String,
    },
    content:{ type: String
    }
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment; 

