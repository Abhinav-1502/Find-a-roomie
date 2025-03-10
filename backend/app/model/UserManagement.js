// Importing necessary libraries and configurations
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Used for password hashing
import jwt from "jsonwebtoken"; // Used for JSON Web Token generation
import 'dotenv/config'; // For accessing environment 

// Creating a Schema object from mongoose
const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({

    userId: {
            type: String,
            default: () => uuidv4(), 
            unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    phone:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    postedList:{
        type: [String],
        required: false
    },
    wishList:{
        type: [String],
        required: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

// Password hashing 
userSchema.pre('save', async function (next) {
    // if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// JWT Token generation method
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });
};

userSchema.methods.resetPassword = async function (newPassword) {
    this.password  = newPassword;
};


const userModel = mongoose.model('User', userSchema);

export default userModel;
