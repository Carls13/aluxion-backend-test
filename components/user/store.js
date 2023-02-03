const userModel = require("./model");
const bcrypt = require("bcryptjs");

const addUser = async (userData) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userData.password, salt);
  const createdUser = await userModel.create({
    ...userData,
    password: hashedPassword,
  });

  return createdUser;
};

const findUserByEmail = async (email) => {
  const user = await userModel.findOne({ email }).exec();

  return user;
};

const getUserDetails = async (email) => {
  const user = await userModel
    .findOne({ email })
    .select("email username")
    .exec();

  return user;
};

const saveNewPassword = async (email, newPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  const filter = {
    email,
  };

  const update = {
    password: hashedPassword,
  };

  const updatedUser = await userModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  return updatedUser;
};


module.exports = {
  addUser,
  findUserByEmail,
  getUserDetails,
  saveNewPassword,
};
