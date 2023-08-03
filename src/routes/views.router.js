import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
  res.send();
});

viewsRouter.get("/profile", (req, res) => {
  res.render("profile", { user: req.session.passport.user });
});

export default viewsRouter;
