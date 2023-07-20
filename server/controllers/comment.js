import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const addComment = async (req, res, next) => {
  try {
   
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    if(newComment){
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);}
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(comment.videoId);
    const currentUser = await User.findById(req.user.id);

    if (
      req.user.id === comment.userId ||
      req.user.id === video.userId ||
      currentUser.isSuperUser
    ) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your comment!"));
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
