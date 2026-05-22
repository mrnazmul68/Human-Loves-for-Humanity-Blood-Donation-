const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    const newUser = await User.create({
      name,
      email,
      password
    });

    const userWithoutPassword = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      upozila: newUser.upozila,
      isDonor: newUser.isDonor,
      bloodGroup: newUser.bloodGroup,
      mobile: newUser.mobile,
      profilePicture: newUser.profilePicture,
      hasDonated: newUser.hasDonated,
      lastDonationDate: newUser.lastDonationDate,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      upozila: user.upozila,
      isDonor: user.isDonor,
      bloodGroup: user.bloodGroup,
      mobile: user.mobile,
      profilePicture: user.profilePicture,
      hasDonated: user.hasDonated,
      lastDonationDate: user.lastDonationDate,
      createdAt: user.createdAt
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
