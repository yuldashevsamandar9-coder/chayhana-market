import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/Member.enum";

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
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error goLogin Page", err);
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
    res.send(err);
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
    console.log("Error goLogin Page", err);
    res.send(err);
  }
};

export default shopController;
