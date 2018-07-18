var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
    commentHead: String,
    commentText: String
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;