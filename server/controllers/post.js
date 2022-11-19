import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged In!");

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const q1 = `SELECT p.*, u.id AS userId, username, profilePicture FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;

    const q2 = `SELECT p.*, u.id AS userId, username, profilePicture FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`;

    const useQuery = userId !== "undefined" ? q2 : q1;
    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(useQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const createPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged In!");

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const q =
      "INSERT INTO posts (`desc`, `image`, `createdAt`, `userId`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.image,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post created!");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged In!");

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only post");
    });
  });
};
