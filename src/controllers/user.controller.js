const db = require("../models");
const User = db.rest.models.user;

exports.getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return res.status(400).send({ message: "No user found at this ID" });
  }

  return res.send(user);

  res.send({
    message: "The getUser route is working!",
  });
};

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Both username and password must be provided" });
  }

  let userExists = await User.findOne({
    where: {
      username,
    },
  });

  if (userExists) {
    return res.status(400).send({
      message: `A user with the name ${username} already exists, please choose a unique username`,
    });
  }

  try {
    let newUser = await User.create({
      username,
      password,
    });
    return res.send(newUser);
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { username, password } = req.body;
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return res
      .status(400)
      .send({ message: "No user exists at the provided ID" });
  }

  try {
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }

    user.save();

    return res.send({
      message: `User with id: ${id} updated!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({
      message: "Please provide the ID of the user you would like to delete",
    });
  }

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return res
      .status(400)
      .send({ message: "No user exists at the provided ID" });
  }

  try {
    await user.destroy();

    return res.send({
      message: `User with id: ${id} removed`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};
