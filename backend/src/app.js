const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3001;

const db = require("./config/db");

const heroRoute = require("./routes/heroRoute");
const projectRoute = require("./routes/projectRoute");
const messageRoute = require("./routes/messageRoute");
const skillRoute = require("./routes/skillRoute");
const certificateRoute = require("./routes/certificateRoute");
const testimonialRoute = require("./routes/testimonialRoute");

app.use(cors());
app.use(express.json());

app.use(heroRoute);
app.use(projectRoute);
app.use(messageRoute);
app.use(skillRoute);
app.use(certificateRoute);
app.use(testimonialRoute);

app.get("/", (req, res) => {
    res.send("Selamat datang di API saya!");
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});