const { User } = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, publicId, phone, type } = req.body;
    const user = new User({
      name: name,
      publicId: publicId,
      phone: phone,
      type: type,
    });
    await user.save();
    res.status(200).send({
      message: user,
    });
  } catch (e) {
    res.status(500).send({
      message: e.toString(),
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { publicId } = req.query;
    const user = await User.findOne({ publicId: publicId });
    res.status(200).send({
      message: user,
    });
  } catch (e) {
    res.status(500).send({
      message: e.toString(),
    });
  }
};

module.exports = {
  registerUser: registerUser,
  getUser: getUser,
};
