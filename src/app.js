import express from "express";
import {__dirname, pathJoin} from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import sessionsRouter from "./routes/sessions.router.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
config({ path: pathJoin(__dirname, ".env" )});

const {
  MDB_USER,
  MDB_PASS,
  MDB_HOST,
  DATABASE_NAME,
  PORT,
  RENDER_ENDPOINT,
  GH_SESSION_SECRET,
  GH_CLIENT_ID
} = process.env;

const MONGO_URL = `mongodb+srv://${MDB_USER}:${MDB_PASS}@${MDB_HOST}/${DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express();

initializePassport(GH_CLIENT_ID, GH_SESSION_SECRET)
app.use(passport.initialize())

app.use(express.static(pathJoin(__dirname ,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 30 * 60,
    }),
    resave: false,
    saveUninitialized: false,
    secret: GH_SESSION_SECRET,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", pathJoin(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(cookieParser());

const validateSession = (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    // Session is valid, proceed to the next middleware or route handler
    next();
  } else {
    // Session is not valid or not present, redirect to login page or return an error
    res.redirect("/login");
  }
};

const validateActiveSession = (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    res.redirect("/profile");
  } else {
    // Session is not valid or not present, redirect to login page or return an error
    next();
  }
};
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info("mongoose connected");

    app.use("/api/session", sessionsRouter);

    app.get("/login", validateActiveSession, async (req, res) => {
      res.render("login", {});
    });

    app.get("/register", validateActiveSession, async (req, res) => {
      res.render("register", {});
    });

    viewsRouter.get("/error", (req, res) => {
      switch (req.statusCode) {
        case 500:
          res.render("error", {
            httpStatus: 500,
            message: "An error has ocurred",
          });
          break;
        default:
          res.render("error", { httpStatus: 404, message: "Not found" });
          break;
      }
    });

    app.use(validateSession);
    app.use("/",validateSession, viewsRouter);

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en ${ RENDER_ENDPOINT || "https://127.0.0.1:"+ PORT+"/"} con éxito`);
    });
  });
