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

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
