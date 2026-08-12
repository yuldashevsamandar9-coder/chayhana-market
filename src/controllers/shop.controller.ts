import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/Member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const shopController: T = {};
const memberService = new MemberService();
/*
╔════════════════════════════════════════════════════════╗
║                    BSSR                 ║
╚════════════════════════════════════════════════════════╝
*/
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("GoHome");
    res.render("home");
    // send | json | redirect | end | render => response method turlari
  } catch (err) {
    console.log("ERorr goHome", err);
  }
};

/*
╔════════════════════════════════════════════════════════╗
║                     LOGIN  JARAYONI                   ║
╚════════════════════════════════════════════════════════╝
*/

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

shopController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");

    const result = await memberService.getUsers();

    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
  }
};
shopController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error,updateChosenUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else
      res
        .status(Errors.standard.code)
        .json({ message: Errors.standard.message });
  }
};

shopController.verifyShop = (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.member?.memberType === MemberType.SHOPDUKON) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHECENTED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`,
    );
  }
};

export default shopController;
