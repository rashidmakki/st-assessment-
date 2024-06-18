const userService = require('../service/user.service');
const { getToken } = require('./auth.controller')
// Create User
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    return res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = await userService.updateUser(id, userData);
    return res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const login = async(req,res) => {
  try{
    const { email, password } = req.body;

    // 1) Check if email and password exists
    if (!email || !password) {
        return next(new AppError('Please provide email and password.', 400));
    }

    // 2) Check if user exists and password is correct
    const user = await userService.findByProperty(email,'+password');
    console.log(user)
    if (!user || !(await userService.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything is ok, send token to client
    const token = await getToken(user.id);

    res.status(200).json({
        status: 'success',
        token
    });

  }catch(err){
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login
}
