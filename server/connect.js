import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "olaoluwa",
  password: "authority",
  database: "social",
});
