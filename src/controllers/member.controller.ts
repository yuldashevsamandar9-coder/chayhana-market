import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import {
  ExtendedRequest,
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";
const memberService = new MemberService();
const authService = new AuthService();

// REACT

const memberController: T = {};

/** ============ SIGNUP  PAGE ============ */

memberController.getShop = async (req: Request, res: Response) => {
  try {
    console.log("getShop");
    const result = await memberService.getShop();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error go getShop ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input),
      // TODO: TOKENS AUTHENTICATIONS
      token = await authService.createToken(result);
    //console.log("token:", token);

    res.cookie("accessToken", token, {
      maxAge: Number(AUTH_TIMER) * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("Errors go Signup ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else
      res
        .status(Errors.standard.code)
        .json({ message: Errors.standard.message });
    //res.json({});
  }
};

/** ============ LOGIN PAGE ============ */

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log(" Login");
    const input: LoginInput = req.body,
      result = await memberService.login(input),
      // TODO: TOKENS AUTHENTICATIONS
      token = await authService.createToken(result);
    // console.log("token =>", token);

    res.cookie("accessToken", token, {
      maxAge: Number(AUTH_TIMER) * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("Error go Login ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    //res.json({});
  }
};

/** ============ LOGOUT PAGE ============ */
memberController.logout = (req: ExtendedRequest, res: Response) => {
  try {
    console.log("logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("Error go Logout ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/** ============ GETMEMBERDETAIL PAGE ============ */

memberController.getMemberDetail = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    console.log("getMemberDetail");
    const result = await memberService.getMemberDetail(req.member);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error go getMemberDetailt ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.updateMember = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateMember");
    const input: MemberUpdateInput = req.body;
    if (req.file) input.memberImage = req.file.path;
    const result = await memberService.updateMember(req.member, input);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error go updateMember ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
memberController.getTopUsers = async (req: Request, res: Response) => {
  try {
    console.log("getTopUsers");
    const result = await memberService.getTopUsers();
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error go getTopUsers ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/** ============ DETAIL ============ */

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token); // pass qilindi

    if (!req.member)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHECENTED);

    next();
  } catch (err) {
    console.log("Error go verifyAuth ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token); // pass qilindi

    next();
  } catch (err) {
    console.log("Error go retrieveAuth ", err);

    next();
  }
};
export default memberController;
