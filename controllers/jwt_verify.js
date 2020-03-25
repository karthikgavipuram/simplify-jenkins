const jwt = require("jsonwebtoken");

const verifyJwtToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      "l^TBrqZDMj3&nxnjvMwcRHo0VW94at8*LIRQ9enkjmbIq*HkVN42WzZfcy9ynesWj1K2KhVWUvD0sFJiUSfe2kwwPeYC6N^Uin29UYWby",
      { algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) return reject(err);
        return resolve(decoded);
      }
    );
  });
module.exports = Object.assign({}, { verifyJwtToken });
