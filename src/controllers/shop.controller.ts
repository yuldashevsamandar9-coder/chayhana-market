import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/Member.enum";
import Errors, { Message } from "../libs/Errors";

const shopController: T = {};
const memberService = new MemberService();
/**  BSSR    **/
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("GoHome");
    res.render("home");
    // send | json | redirect | end | render => response method turlari
  } catch (err) {
    console.log("ERorr goHome", err);
  }
};

/**.        Login Jaroyini  Start  * */

shopController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("Go SignUp Page");
    res.render("signup");
  } catch (err) {
    console.log("Error Go Signup Page", err);
    res.redirect("/admin");
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error goLogin Page", err);
    res.redirect("/admin");
  }
};

shopController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("Process Singup");

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.SHOPDUKON;

    const result = await memberService.processSignup(newMember);
    // TODO: SESIONS Authentication

    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.log("Error processSignup Page", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      ` <script> alert("${message}"); window.location.replace('admin/signup') </script>`,
    );
  }
};

shopController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("done");
    const input: LoginInput = req.body,
      result = await memberService.processLogin(input);
    // TODO: SESIONS Authentication

    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.log("Error, processLogin:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      ` <script> alert("${message}"); window.location.replace('admin/login') </script>`,
    );
  }
};

shopController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout:", err);
    res.redirect("/admin");
  }
};

export default shopController;
