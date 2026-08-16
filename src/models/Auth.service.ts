import dotenv from "dotenv";
dotenv.config();

import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";

class AuthService {
  private readonly secretToken: string;

  constructor() {
    this.secretToken = process.env.SECRET_TOKEN as string;
  }

  public async createToken(payload: Member): Promise<string> {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`;

      // 1. Mongoose Document'ni oddiy Plain JavaScript obyektiga o'tkazamiz:
      const memberData =
        typeof (payload as any).toObject === "function"
          ? (payload as any).toObject()
          : { ...payload };

      // 2. JWT ichiga faqat kerakli ma'lumotlarni joylaymiz
      jwt.sign(
        {
          _id: memberData._id,
          memberNick: memberData.memberNick,
          memberType: memberData.memberType,
          memberStatus: memberData.memberStatus,
        },
        this.secretToken,
        {
          expiresIn: duration,
        },
        (err, token) => {
          if (err) {
            console.log("JWT Sign Real Error:", err); // <-- Haqiqiy xatoni terminalda ko'rish uchun
            reject(
              new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED),
            );
          } else {
            resolve(token as string);
          }
        },
      );
    });
  }

  public async checkAuth(token: string): Promise<Member> {
    const result = (await jwt.verify(token, this.secretToken)) as Member;
    console.log(`----- [AUTH] memberNick: ${result.memberNick}`);
    return result;
  }
}

export default AuthService;
