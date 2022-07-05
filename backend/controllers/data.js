const { Data } = require("../models/data");
const { User } = require("../models/user");

const getData = async (req, res) => {
  try {
    const { user } = req.query;
    console.log(user);
    const data = await Data.find({ user: user });
    res.status(200).send({
      message: data,
    });
  } catch (e) {
    res.status(500).send({
      message: e.toString,
    });
  }
};

module.exports = {
  getData: getData,
};
