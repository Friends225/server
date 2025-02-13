// Import the mysql package
const mysql = require("mysql");

// Create a connection pool
// let pool;
// try {
const pool = mysql.createConnection({
  connectionLimit: 50,
  // host: "198.12.221.39",
  host: "208.109.20.122",
  user: "FriendsConsultantAdmin",
  password: "!!FRIENDSconsultant!!",
  database: "friends-consultant.com",
});
// } catch (err) {
//   console.log("Error", err);
// }

// Export the pool so it can be used in other files
module.exports = pool;
