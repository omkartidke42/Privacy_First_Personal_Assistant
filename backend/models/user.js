import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
});

// Create a model named "User" (collection will be 'users')
const User = mongoose.model("User", userSchema);

// Export the model
export default User;
