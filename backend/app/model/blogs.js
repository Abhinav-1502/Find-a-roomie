// Importing mongoose, a Node.js library for MongoDB.
import mongoose  from "mongoose";
// Creating a Schema object from mongoose
const Schema = mongoose.Schema;
// Defining the schema for a blog document.
const blogSchema = new Schema({
    blogId:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now
    },
    blogContent: {
        type: String,
        required: true
    },
    blogComments: [
        {
            user: {type: String, required: true},
            comment: {type: String, required: true}
        },
    ]
});

// Creating a model from the schema. The model is used to create and manage documents that follow the defined schema.
const blogModel = mongoose.model('Blog', blogSchema);

// Exporting the blogModel for use in other parts of the application.
export default blogModel;