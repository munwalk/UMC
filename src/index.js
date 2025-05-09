import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateStore } from "./controllers/store.controller.js";
import {
  handleAddReview,
  handleListStoreReviews,
  handleListMyReviews,
} from "./controllers/review.controller.js";
import {
  handleAddMission,
  handleChallengeMission,
  handleListStoreMissions,
  handleListOngoingMissions,
  handleCompleteMission,
} from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static("public"));

// 기본 테스트 라우트
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);

// 특정 지역에 가게 추가
app.post("/api/v1/stores", handleCreateStore);

// 가게에 리뷰 추가
app.post("/api/v1/reviews", handleAddReview);

// 가게에 리뷰 목록 조회 (커서 기반 페이지네이션)
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// 가게에 미션 추가
app.post("/api/v1/missions", handleAddMission);

// 미션 도전하기 (중복 체크)
app.post("/api/v1/missions/challenge", handleChallengeMission);

// ✅ 내가 작성한 리뷰 목록 조회
app.get("/api/v1/users/:memberId/reviews", handleListMyReviews);

// ✅ 특정 가게의 미션 목록 조회
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

// ✅ 내가 진행 중인 미션 목록 조회
app.get("/api/v1/users/:memberId/missions/ongoing", handleListOngoingMissions);

// ✅ 내가 진행 중인 미션 완료 처리
app.patch("/api/v1/missions/complete", handleCompleteMission);


/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
