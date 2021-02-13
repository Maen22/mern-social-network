import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";
import formidable from "formidable";
import fs from "fs";

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    if (!user)
      return res.status(400).json({
        error: "User not found",
      });

    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.status(200).json(req.profile);
};
const update = async (req, res) => {
  let form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);

      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }

    let user = req.profile;
    user = extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    try {
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.status(200).json(deleteUser);
  } catch (err) {
    return (
      res.status(400),
      json({
        error: errorHandler.getErrorMessage(err),
      })
    );
  }
};

const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

const defaultPhoto = (req, res) => {
  return res.sendFile(
    "E:/Dev/MERN_STACK/social-network/client/src/assests/images/profile.png"
  );
};

const addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId },
    });
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const addFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.body.userId },
      },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();

    result.hashed_password = undefined;
    result.salt = undefined;

    return res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.unfollowId },
    });
    next();
  } catch (err) {
    return res.status(400).jsno({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.unfollowId,
      {
        $pull: { followers: req.body.userId },
      },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();

    result.hashed_password = undefined;
    result.salt = undefined;

    return res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  list,
  userById,
  create,
  read,
  update,
  remove,
  photo,
  defaultPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
};
