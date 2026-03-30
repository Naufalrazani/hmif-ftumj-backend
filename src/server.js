require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`Server HMIF FT-UMJ Running on Port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/test-connection`);
  console.log(`-----------------------------------------`);
});
