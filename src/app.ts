import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/registerUserRoutes";
import adminRoutes from "./routes/registerAdminRoutes";
import loginRoutes from "./routes/loginUserRoutes";
import packageRoutes from "./routes/packageRoutes";
import eventRoutes from "./routes/eventRoutes";
import loginAdminRoutes from "./routes/loginAdminRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8084;

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", packageRoutes);
app.use("/api", eventRoutes);
app.use("/api", adminRoutes);
app.use("/api", loginAdminRoutes);

app.use(express.static(path.join(__dirname, "views")));
app.get("/registerUser", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "registerUserView.html"));
});

app.get("/loginUserView", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "loginUserView.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "welcomeView.html"));
});

app.get("/registerEvent", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "registerEvent.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});