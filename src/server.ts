
import dotenv from "dotenv";
import {env} from "./config/config.js";
import app from "./app.js";

dotenv.config();

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
