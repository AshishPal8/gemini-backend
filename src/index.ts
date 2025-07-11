import { app } from "./app";
import { createServer } from "http";
import { PORT } from "./utils";

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
