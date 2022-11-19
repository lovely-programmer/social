import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;

  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...others } = data[0];
    return res.status(200).json(others);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged In!");

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const q =
      "UPDATE users SET `username` = ?, `city` = ?, `website` = ?, `profilePicture` = ?, `coverPicture` = ? WHERE id = ?";

    db.query(
      q,
      [
        req.body.username,
        req.body.city,
        req.body.website,
        req.body.profilePicture,
        req.body.coverPicture,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("User Updated.");
        return res.status(403).json("You can update only yourself");
      }
    );
  });
};
