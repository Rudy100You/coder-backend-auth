import { Router } from "express";
//import { UserRepository } from "../dao/repository/user.repository.js";
//import { AdminManager } from "../dao/fileSystem/admin.manager.js";
import passport from "passport";

const sessionsRouter = Router();

//const userRepository = new UserRepository();
//const adminManager = new AdminManager();

sessionsRouter.post("/register", passport.authenticate("register",{failureRedirect:"/error"}),(req,res)=>res.status(200))

sessionsRouter.post("/login", passport.authenticate("login",{successRedirect:"/profile"}),(req,res)=>{
  res.redirect("/profile")})

/*sessionsRouter.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const exist = await userRepository.existsByCriteria({ email });
    if (exist)
      return res
        .status(400)
        .send({ status: "error", message: "User already exists" });
    else {
      await userRepository.create(req.body);
      res.send({ status: "success", message: "User registered successfully" });
    }
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "An error has occurred. Try Again Later",
    });
  }
});

  sessionsRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let currentRole = "user";
    let user = await adminManager.findAdminByEmailAndPassword(email, password);
    if (user) currentRole = "ADMIN";
    else user = await userRepository.getOneByCriteria({ email, password });

    if (!user)
      return res
        .status(400)
        .send({ status: "error", message: "Incorrect user or password" });

    req.session.user = {
      name: `${user.firstName}, ${user.lastName}`,
      email: user.email,
      birthday: new Date(user.birthday).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      role: currentRole,
    };
    res.send({ status: "success", message: "Logged In" });
  } catch (err) {
    res.status(500).send({ status: "error", message: "An error has occurred" });
  }
});
*/
sessionsRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.redirect(500, "/error");
    } else {
      res.redirect("/login"); // Redirect to the login page after destroying the session
    }
  });
});

sessionsRouter.get("/github", passport.authenticate("github"),async(req,res)=>{res.status(200)})

sessionsRouter.get("/github/callback", passport.authenticate("github",{failureRedirect:"/login", successRedirect:"/profile"}),async(req,res)=>{res.status(200)})

export default sessionsRouter;
