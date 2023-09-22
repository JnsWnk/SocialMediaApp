import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new Post(post);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFriendsPosts = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendPosts = await Post.find({ userId: { $in: user.friends } });

    return res.status(200).json(friendPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const isPostLiked = user.likedPosts.some((likedPostId) =>
      likedPostId.equals(postId)
    );

    if (isPostLiked) {
      user.likedPosts = user.likedPosts.filter(
        (likedPostId) => !likedPostId.equals(postId)
      );
      post.likeCount--;
    } else {
      user.likedPosts.push(postId);
      post.likeCount++;
    }
    const savedPost = await post.save();
    const savedUser = await user.save();
    res.status(200).json({ likedPosts: savedUser.likedPosts, post: savedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
