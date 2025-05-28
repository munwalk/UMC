import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();

/**
 * Google 로그인 후 사용자 정보를 검증 및 생성
 */
const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error("Google profile에서 이메일을 찾을 수 없습니다.");
  }

  // 기존 사용자 조회
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    return {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };
  }

  // 새 사용자 생성
  const newUser = await prisma.user.create({
    data: {
      email,
      name: profile.displayName || "이름 없음",
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  };
};

/**
 * Google Strategy 등록
 */
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await googleVerify(profile);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);