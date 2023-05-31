import * as mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

const promisePool = pool.promise();

const selectQuery = async (query, params) => {
  const connection = await promisePool.getConnection(async (conn) => conn);
  try {
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

export { selectQuery };
