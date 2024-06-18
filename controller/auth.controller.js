const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");
const dotenv = require('dotenv').config();

exports.getToken = async (userId) => {
    return await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN // set to 7d for 7 days
    });
}

exports.verifyToken = async (token) => {
    return await jwt.verify( token, process.env.JWT_SECRET );
}

exports.auth = async (req, res, next) => {
    // 1) Get token, check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
    // 2) Verify token
    const decoded = await this.verifyToken(token);
  
    // 3) Check if user still exists
    const foundUser = await userService.getUserById(decoded.id);
    if (!foundUser) {
      return next(
        new AppError('The user associated with this token no longer exists.', 401)
      );
    }
  
    // 4) Check if user changed password after the token was issued
    if (userService.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password. Please log in again', 401)
      );
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = foundUser;
    next();
};