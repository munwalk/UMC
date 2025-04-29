import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateStore } from "./controllers/store.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission, handleChallengeMission } from "./controllers/mission.controller.js";

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

// 가게에 미션 추가
app.post("/api/v1/missions", handleAddMission);

// 미션 도전하기 (중복 체크)
app.post("/api/v1/missions/challenge", handleChallengeMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
