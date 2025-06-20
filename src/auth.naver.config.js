import dotenv from "dotenv";
import { Strategy as NaverStrategy } from "passport-naver-v2";
import { prisma } from "./db.config.js";

dotenv.config();

export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/naver",
  },
  async (accessToken, refreshToken, profile, done) => {
    const response = profile._json?.response;

    const email = response?.email;
    const name = response?.name || "네이버사용자";

    if (!email) {
      return done(new Error("네이버 프로필에 이메일이 없습니다."));
    }

    try {
      let user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name,
            gender: "미정",
            birth: new Date(1970, 0, 1),
            address: "미정",
            detailAddress: "미정",
            phoneNumber: "미정",
          },
        });
      }

      return done(null, {
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (err) {
      return done(err);
    }
  }
);
