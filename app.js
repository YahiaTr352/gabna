
const express = require("express");
const axios = require("axios");
const potatoRoutes = require("./routes/potato");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const userAgentFilter = require("./middlewares/userAgentFilter");
const limiter = require("./middlewares/limiter");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // تحميل متغيرات البيئة من .env

const app = express();
const port = 3001;

// إعدادات عامة
app.disable("x-powered-by");
app.use(userAgentFilter);
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.set('trust proxy', 1); // أو true

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// إعدادات الجلسة
const sessionSecret = process.env.SESSION_SECRET || "default_session_secret";
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax"
  }
}));

// الراوتس
app.use("/api/clients", potatoRoutes);

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
