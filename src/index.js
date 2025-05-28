// 의존성 불러오기
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import swaggerUiExpress from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";

import { googleStrategy } from "./auth.config.js";
import { naverStrategy } from "./auth.naver.config.js";
import { prisma } from "./db.config.js";

import { handleUserSignUp, handleUpdateMyInfo } from "./controllers/user.controller.js";
import { handleCreateStore, handleGetStore } from "./controllers/store.controller.js";
import {
  handleAddReview, handleListStoreReviews, handleListMyReviews,
} from "./controllers/review.controller.js";
import {
  handleAddMission, handleChallengeMission, handleListStoreMissions,
  handleListOngoingMissions, handleCompleteMission,
} from "./controllers/mission.controller.js";

// 기본 설정
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// 공통 응답 미들웨어 (항상 가장 먼저)
app.use((req, res, next) => {
  res.success = (success) => res.json({ resultType: "SUCCESS", error: null, success });
  res.error = ({ errorCode = "unknown", reason = null, data = null }) =>
    res.json({ resultType: "FAIL", error: { errorCode, reason, data }, success: null });
  next();
});

// 기본 미들웨어
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 세션 설정
app.use(
  session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  })
);

// Passport 초기화
passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
app.use(passport.initialize());
app.use(passport.session());

// API 라우트
app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores", handleCreateStore);
app.post("/api/v1/reviews", handleAddReview);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.post("/api/v1/missions", handleAddMission);
app.post("/api/v1/missions/challenge", handleChallengeMission);
app.get("/api/v1/users/me/reviews", handleListMyReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/v1/users/:memberId/missions/ongoing", handleListOngoingMissions);
app.patch("/api/v1/missions/complete", handleCompleteMission);
app.get("/api/v1/stores/:storeId", handleGetStore);
app.patch("/api/v1/users/me", handleUpdateMyInfo);

// OAuth: Google
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// OAuth: Naver
app.get("/oauth2/login/naver", passport.authenticate("naver"));
app.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/oauth2/login/naver",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// 로그인 테스트
app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
});

// Swagger 문서
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup({}, {
  swaggerOptions: { url: "/openapi.json" },
}));

app.get("/openapi.json", async (req, res, next) => {
  try {
    const options = { openapi: "3.0.0", disableLogs: true, writeOutputFile: false };
    const outputFile = "/dev/null";
    const routes = ["./src/index.js"];
    const doc = {
      info: { title: "UMC 7th", description: "UMC 7th Node.js 테스트 프로젝트입니다." },
      host: "localhost:3000",
    };
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
  } catch (err) {
    next(err);
  }
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (typeof res.error === "function") {
    res.status(err.statusCode || 500).error({
      errorCode: err.errorCode || "unknown",
      reason: err.reason || err.message || null,
      data: err.data || null,
    });
  } else {
    res.status(err.statusCode || 500).json({
      resultType: "FAIL",
      error: {
        errorCode: err.errorCode || "unknown",
        reason: err.reason || err.message || null,
        data: err.data || null,
      },
      success: null,
    });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
