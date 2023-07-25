import express from "express"
import { registerController ,loginController, testController,forgotPasswordController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";
const router = express.Router();

//register
router.post("/register",registerController);

//login
router.post("/login",loginController);

//forgot password
router.post("/forgot-password",forgotPasswordController);


router.get("/test",requireSignIn,isAdmin,testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });



//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin,(req, res) => {
    res.status(200).send({ ok: true });
  });

export default router;