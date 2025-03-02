import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/registerUserRoutes";
import loginRoutes from "./routes/loginRoutes";
import packageRoutes from "./routes/packageRoutes";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8084;

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", packageRoutes);
app.use("/api", eventRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});