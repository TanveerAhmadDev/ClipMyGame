import postModel from "../models/post.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import postLikeModel from "../models/postLike.model.js";
import axios from "axios";
import * as cheerio from "cheerio";
import athleteModel from "../models/athlete.model.js";
import mediaModel from "../models/media.model.js";
import commentModel from "../models/comment.model.js";

// Create Post
// export const createPost = asyncHandler(async (req, res) => {
//   const { caption = "", visibility = "Public" } = req.body;

//   const user = req.user;

//   const userId = user._id;

//   const metadata = JSON.parse(req.body.metadata || "{}");

//   const {
//     contentType = "General",
//     sport,
//     skills = [],
//     level = "",
//     location = {},
//     tags = [],
//   } = metadata;

//   const files = req.files || [];

//   console.log(files);

//   if (!caption.trim() && files.length === 0) {
//     throw new apiError(400, "Post must contain a caption, image, or video.");
//   }

//   if (!sport) {
//     throw new apiError(400, "Sport is required.");
//   }

//   const media = [];

//   for (const file of files) {
//     const uploaded = await uploadToCloudinary(file.path, "ClipMyGame/Posting");

//     media.push({
//       url: uploaded.secure_url,
//       type: file.mimetype.startsWith("image/") ? "image" : "video",
//     });
//   }

//   const post = await postModel.create({
//     userId,
//     caption,
//     visibility,
//     media,

//     contentType,
//     sport,
//     skills,
//     level,
//     location,
//     tags,
//   });

//   return res
//     .status(201)
//     .json(new apiResponse(201, "Post created successfully.", post));
// });

export const createPost = asyncHandler(async (req, res) => {
  const { caption = "", visibility = "Public" } = req.body;

  const user = req.user;
  const userId = user._id;

  const metadata = JSON.parse(req.body.metadata || "{}");

  const {
    contentType = "general",
    sport,
    skills = [],
    level = "",
    location = {},
    tags = [],
    externalMedia = [],
  } = metadata;

  const files = req.files || [];

  // Check if post has anything
  if (!caption.trim() && files.length === 0 && externalMedia.length === 0) {
    throw new apiError(
      400,
      "Post must contain a caption, image, video, or external media.",
    );
  }

  // Sport is required
  if (!sport) {
    throw new apiError(400, "Sport is required.");
  }

  const media = [];

  // --------------------------------
  // Upload images/videos to Cloudinary
  // --------------------------------

  for (const file of files) {
    const uploaded = await uploadToCloudinary(file.path, "ClipMyGame/Posting");

    media.push({
      url: uploaded.secure_url,
      type: file.mimetype.startsWith("image/") ? "image" : "video",
    });
  }

  // --------------------------------
  // Add YouTube/Facebook media
  // --------------------------------

  for (const item of externalMedia) {
    media.push({
      url: item.url,
      type: "external",
      platform: item.platform,
    });
  }

  // --------------------------------
  // Create post
  // --------------------------------

  const post = await postModel.create({
    userId,
    caption,
    visibility,
    media,

    contentType,
    sport,
    skills,
    level,
    location,
    tags,
  });

  return res
    .status(201)
    .json(new apiResponse(201, "Post created successfully.", post));
});

// Delete Post
export const deletePost = asyncHandler(async (req, res) => {
  const post = await postModel.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  const afterDeleteNewPostArray = await postModel.find({
    userId: req.user._id,
  });

  if (!post) {
    throw new apiError(404, "Post not found.");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        "Post deleted successfully.",
        afterDeleteNewPostArray,
      ),
    );
});

export const posts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const posts = await postModel
    .find()
    .populate("userId", "userName fullName profilePhoto userRole isVerified")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPosts = await postModel.countDocuments();

  // Get all post IDs
  const postIds = posts.map((post) => post._id);

  // Get all comments for these posts in ONE query
  const comments = await commentModel
    .find({
      post: { $in: postIds },
    })
    .populate("user", "userName fullName profilePhoto")
    .sort({ createdAt: -1 });

  // Attach comments to their posts
  const postsWithComments = posts.map((post) => {
    const postObject = post.toObject();

    const postComments = comments.filter(
      (comment) => comment.post.toString() === post._id.toString(),
    );

    return {
      ...postObject,
      comments: postComments,
    };
  });

  return res.status(200).json(
    new apiResponse(200, "Posts fetched successfully.", {
      posts: postsWithComments,

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        hasNextPage: page * limit < totalPosts,
        hasPreviousPage: page > 1,
      },
    }),
  );
});

export const getPosts = asyncHandler(async (req, res) => {
  const {
    sport,
    contentType,
    skill,
    level,
    countryCode,
    stateCode,
    city,
    sortBy = "latest",
  } = req.query;

  const filter = {};

  if (sport) {
    filter.sport = sport;
  }

  if (contentType) {
    filter.contentType = contentType;
  }

  if (skill) {
    filter.skills = skill;
  }

  if (level) {
    filter.level = level;
  }

  if (countryCode) {
    filter["location.countryCode"] = countryCode;
  }

  if (stateCode) {
    filter["location.stateCode"] = stateCode;
  }

  if (city) {
    filter["location.city"] = city;
  }

  let sort = { createdAt: -1 };

  if (sortBy === "trending") {
    sort = {
      "performance.likes": -1,
      "performance.comments": -1,
      createdAt: -1,
    };
  }

  // Get posts + basic user information
  const posts = await postModel
    .find(filter)
    .populate("userId", "fullName userName profilePhoto userRole")
    .sort(sort);

  // Get role-specific information
  const postsWithRoleData = await Promise.all(
    posts.map(async (post) => {
      const user = post.userId;

      let roleData = null;

      if (user?.userRole === "Athlete") {
        roleData = await athleteModel.findOne({
          userId: user._id,
        });
      } else if (user?.userRole === "Media") {
        roleData = await mediaModel.findOne({
          userId: user._id,
        });
      }

      return {
        ...post.toObject(),
        roleData,
      };
    }),
  );

  // Get posts liked by current user
  const postIds = posts.map((post) => post._id);

  const userLikes = await postLikeModel
    .find({
      userId: req.user._id,
      postId: { $in: postIds },
    })
    .select("postId");

  const likedPostIds = new Set(userLikes.map((like) => like.postId.toString()));

  // // Add liked status
  // const formattedPosts = postsWithRoleData.map((post) => ({
  //   ...post,

  //   liked: likedPostIds.has(post._id.toString()),
  // }));

  // return res.status(200).json(
  //   new apiResponse(200, "Posts fetched successfully.", {
  //     posts: formattedPosts,
  //   }),
  // );

  const comments = await commentModel
    .find({
      post: { $in: postIds },
    })
    .populate("user", "userName fullName profilePhoto")
    .sort({ createdAt: -1 });

  // Add comments + liked status
  const formattedPosts = postsWithRoleData.map((post) => {
    const postComments = comments.filter(
      (comment) => comment.post.toString() === post._id.toString(),
    );

    return {
      ...post,

      liked: likedPostIds.has(post._id.toString()),

      comments: postComments,
    };
  });

  return res.status(200).json(
    new apiResponse(200, "Posts fetched successfully.", {
      posts: formattedPosts,
    }),
  );
});

export const getPostFilters = asyncHandler(async (req, res) => {
  const sportEnum = postModel.schema.path("sport").enumValues;

  const levelEnum = postModel.schema.path("level").enumValues;

  const skills = await postModel.distinct("skills");

  const contentTypes = postModel.schema.path("contentType").enumValues;

  const countries = await postModel.distinct("location.country");

  const states = await postModel.distinct("location.state");

  const cities = await postModel.distinct("location.city");

  const result = {
    sports: sportEnum,
    levels: levelEnum,
    skills,
    contentTypes,

    locations: {
      countries: countries.filter(Boolean).sort(),
      states: states.filter(Boolean).sort(),
      cities: cities.filter(Boolean).sort(),
    },
  };

  return res
    .status(200)
    .json(new apiResponse(200, "Post filters fetched successfully.", result));
});

export const getPost = asyncHandler(async (req, res) => {
  const user = req.user;

  const userId = user._id;

  const posts = await postModel
    .find({ userId })
    .populate("userId", "fullName userName profilePhoto userRole");

  // Get role-specific information
  const postsWithRoleData = await Promise.all(
    posts.map(async (post) => {
      const user = post.userId;

      let roleData = null;

      if (user?.userRole === "Athlete") {
        roleData = await athleteModel.findOne({
          userId: user._id,
        });
      } else if (user?.userRole === "Media") {
        roleData = await mediaModel.findOne({
          userId: user._id,
        });
      }

      return {
        ...post.toObject(),
        roleData,
      };
    }),
  );

  const formattedPosts = postsWithRoleData.map((post) => ({
    ...post,
  }));

  return res.status(200).json(
    new apiResponse(200, "Posts fetched successfully.", {
      formattedPosts,
    }),
  );
});

export const togglePostLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const userId = req.user._id;

  const post = await postModel.findById(postId);

  if (!post) {
    throw new apiError(404, "Post not found.");
  }

  const existingLike = await postLikeModel.findOne({
    postId,
    userId,
  });

  let liked;

  if (existingLike) {
    // Unlike
    await postLikeModel.deleteOne({
      _id: existingLike._id,
    });

    post.performance.likes = Math.max(0, post.performance.likes - 1);

    liked = false;
  } else {
    // Like
    await postLikeModel.create({
      postId,
      userId,
    });

    post.performance.likes += 1;

    liked = true;
  }

  await post.save();

  return res.status(200).json(
    new apiResponse(200, liked ? "Post liked." : "Post unliked.", {
      liked,
      likes: post.performance.likes,
    }),
  );
});

export const resolveExternalMedia = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    throw new apiError(400, "Media URL is required.");
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new apiError(400, "Invalid URL.");
  }

  // Unsplash page
  if (
    parsedUrl.hostname === "unsplash.com" ||
    parsedUrl.hostname === "www.unsplash.com"
  ) {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    let imageUrl =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content");

    if (!imageUrl) {
      throw new apiError(
        400,
        "Unable to find an image from this Unsplash URL.",
      );
    }

    return res.status(200).json(
      new apiResponse(200, "Media resolved successfully.", {
        url: imageUrl,
        type: "image",
        source: "unsplash",
      }),
    );
  }

  throw new apiError(400, "Unsupported external source.");
});
