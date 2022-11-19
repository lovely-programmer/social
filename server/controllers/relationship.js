import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const q = "SELECT followerUserid FROM relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((relationship) => relationship.followerUserid));
  });
};

export const createRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged In!");

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const q = "INSERT INTO relationships (`followerUserid`, `followedUserId`) VALUES (?)";

    const values = [userInfo.id, req.body.userId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged In!");

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const q = "DELETE FROM relationships WHERE `followerUserid` = ? AND `followedUserId` = ?";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("UnFollowed");
    });
  });
};
