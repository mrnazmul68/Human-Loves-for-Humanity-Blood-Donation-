const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
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
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const file = req.file;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (updateData.isDonor === 'donor') {
      if (!updateData.bloodGroup) {
        return res.status(400).json({
          success: false,
          message: 'Blood group is required for donors'
        });
      }
      if (!updateData.age) {
        return res.status(400).json({
          success: false,
          message: 'Age is required for donors'
        });
      }
      if (!updateData.mobile) {
        return res.status(400).json({
          success: false,
          message: 'Mobile number is required for donors'
        });
      }
      if (!updateData.upozila) {
        return res.status(400).json({
          success: false,
          message: 'Upozila is required for donors'
        });
      }
    }

    if (file) {
      if (user.profilePicturePublicId) {
        await cloudinary.uploader.destroy(user.profilePicturePublicId);
      }
      updateData.profilePicture = file.path;
      updateData.profilePicturePublicId = file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    const userWithoutPassword = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      upozila: updatedUser.upozila,
      isDonor: updatedUser.isDonor,
      bloodGroup: updatedUser.bloodGroup,
      mobile: updatedUser.mobile,
      profilePicture: updatedUser.profilePicture,
      hasDonated: updatedUser.hasDonated,
      lastDonationDate: updatedUser.lastDonationDate,
      createdAt: updatedUser.createdAt
    };

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

exports.getDonors = async (req, res) => {
  try {
    const users = await User.find({});
    const eligibleDonors = users.filter(user => {
      if (user.isDonor !== 'donor' || !user.bloodGroup || !user.upozila || !user.mobile || !user.age) {
        return false;
      }

      if (user.hasDonated && user.lastDonationDate) {
        const lastDonation = new Date(user.lastDonationDate);
        const today = new Date();
        const diffTime = Math.abs(today - lastDonation);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 120) {
          return false;
        }
      }

      return true;
    }).map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      upozila: user.upozila,
      isDonor: user.isDonor,
      bloodGroup: user.bloodGroup,
      mobile: user.mobile,
      phone: user.mobile,
      profilePicture: user.profilePicture,
      hasDonated: user.hasDonated,
      lastDonationDate: user.lastDonationDate,
      createdAt: user.createdAt
    }));

    res.status(200).json({
      success: true,
      donors: eligibleDonors
    });

  } catch (error) {
    console.error('Get donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
