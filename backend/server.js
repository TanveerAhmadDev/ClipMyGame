import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

import app from "./api/index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
