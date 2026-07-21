import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";

const shopController: T = {};
/**  BSSRRR  */
shopController.goHome = (req: Request, res: Response) => {
  try {
    console.log("GoHome");
    res.send("Go Home Page");
  } catch (err) {
    console.log("ERorr goHome", err);
  }
};

shopController.goLogin = (req: Request, res: Response) => {
  try {
    res.send("Go Login Page");
  } catch (err) {
    console.log("Error goLogin Page", err);
  }
};

shopController.goSignup = (req: Request, res: Response) => {
  try {
    res.send("Go Signup Page");
  } catch (err) {
    console.log("Error Go Signup Page", err);
  }
};

export default shopController;
