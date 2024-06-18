const UserModel = require('../model/user.model');
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const user = await UserModel.create(userData);
    return user;
  } catch (error) {
    throw new Error('Error creating User: ' + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await UserModel.findAll();
    return users;
  } catch (error) {
    throw new Error('Error fetching Users: ' + error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Error fetching User by ID: ' + error.message);
  }
};

const findUserByCondition = async(condiition)=> {
  try {
    const User = await UserModel.findOne({
      where:condiition
    });
    if (!User) {
      throw new Error('User not found');
    }
    return User;
  } catch (error) {
    throw new Error('Error fetching User by Condition');
  }
}

const updateUser = async (userId, userData) => {
  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(userData);
    return user;
  } catch (error) {
    throw new Error('Error updating User: ' + error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
  } catch (error) {
    throw new Error('Error deleting pricing: ' + error.message);
  }
};

const findByProperty = async(propertyName, selectProperty )=> {
  return await UserModel.findOne({ email : propertyName }).then(data => data.get({ plain: true }));
}

const correctPassword =  async( candidatePassword , dbPassword) =>{
  return await bcrypt.compare(candidatePassword, dbPassword);
}

const changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); // convert to UTC seconds
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  // Password not changed
  return false;
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findByProperty,
  findUserByCondition,
  correctPassword,
  changedPasswordAfter
};
