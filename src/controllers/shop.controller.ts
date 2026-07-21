import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/Member.enum";

const shopController: T = {};
/**  BSSRRR  */
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("GoHome");
    res.send("Go Home Page");
    // send | json | redirect | end | render => response method turlari
  } catch (err) {
    console.log("ERorr goHome", err);
  }
};

/**.        Login Jaroyini  Start  * */

shopController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Go Login Page");
  } catch (err) {
    console.log("Error goLogin Page", err);
  }
};

shopController.processLogin = (req: Request, res: Response) => {
  try {
    res.send("Go processLogin Page");
    console.log("done");
  } catch (err) {
    console.log("Error goLogin Page", err);
  }
};
/**.        Login Jaroyini Finish   * */
/**.        Signup  Jaroyini  Start  * */
const memberService = new MemberService();

shopController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Go Signup Page");
  } catch (err) {
    console.log("Error Go Signup Page", err);
  }
};

shopController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("req.body:", req.body);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.SHOPDUKON;

    const result = await memberService.processSignup(newMember);
    res.send(result);
  } catch (err) {
    console.log("Error processSignup Page", err);
    res.send(err);
  }
};
/**.        Signup Jaroyini  Finish  * */

export default shopController;
