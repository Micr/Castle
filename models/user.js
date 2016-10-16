import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// for unit testing purposes
mongoose.models = {};
mongoose.modelSchemas = {};

export const userSchemaObject = {
  email: String,
  password: String,
};

const userSchema = new mongoose.Schema(userSchemaObject);

const User = mongoose.model('User', userSchema);

export const createUser = (newUser, callback) => {
  User.findOne({ email: newUser.email }, (err, user) => {
    if (user !== null) {
      callback(true, 'Email already exists');
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save(callback);
        });
      });
    }
  });
};

export const getUserByEmail = (email, callback) => {
  User.findOne({ email }, callback);
};

export const comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

export default User;
