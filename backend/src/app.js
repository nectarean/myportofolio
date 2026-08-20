const express = require("express");
const app = express();

const PORT = 3000;

const db = require("./config/db");

const heroRoute = require("./routes/heroRoute");
const projectRoute = require("./routes/projectRoute");
const messageRoute = require("./routes/messageRoute");

app.use(express.json());

app.use(heroRoute);
app.use(projectRoute);
app.use(messageRoute);

app.get("/", (req, res) => {
    res.send("Selamat datang di API saya!");
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});