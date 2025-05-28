import { StatusCodes } from "http-status-codes";
import {
  addMission,
  challengeMission,
  listStoreMissions,
  listMyOngoingMissions,
  completeMyMission,
} from "../services/mission.service.js";
import { MissionInputError } from "../errors.js";

// 미션 생성
export const handleAddMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 생성 API'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              name: { type: "string" },
              reward: { type: "number" },
              missionSpec: { type: "string" }
            },
            required: ["storeId", "name", "reward", "missionSpec"]
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "미션 생성 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              success: { type: "object" },
              error: { type: "object", nullable: true }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "입력값 오류 (M001)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "M001" },
              reason: { type: "string" },
              data: { type: "object" }
            },
            success: { nullable: true }
          }
        }
      }
    }
  */
  try {
    const { storeId, name, reward, missionSpec } = req.body;
    if (!storeId || !name || !reward || !missionSpec) {
      throw new MissionInputError("미션 입력값이 부족합니다.", req.body);
    }

    const mission = await addMission({ storeId, name, reward, missionSpec });
    res.status(StatusCodes.CREATED).success(mission);
  } catch (err) {
    next(err);
  }
};

// 미션 도전
export const handleChallengeMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 도전 API'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              memberId: { type: "number" },
              missionId: { type: "number" }
            },
            required: ["memberId", "missionId"]
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "미션 도전 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              success: { type: "object", properties: { challengeId: { type: "number" } } },
              error: { type: "object", nullable: true }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "입력값 오류 (M001)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "M001" },
              reason: { type: "string" },
              data: { type: "object" }
            },
            success: { nullable: true }
          }
        }
      }
    }
    #swagger.responses[409] = {
      description: "이미 도전한 미션 (M002)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "M002" },
              reason: { type: "string" },
              data: { type: "object" }
            },
            success: { nullable: true }
          }
        }
      }
    };
  */
  try {
    const userId = req.user?.id;
    const { missionId } = req.body;

    if (!userId || !missionId) {
      return res.status(400).error({ reason: "로그인 정보와 missionId가 필요합니다." });
    }
    const result = await completeMyMission({ memberId: userId, missionId });
    res.status(StatusCodes.OK).success(result);
  } catch (err) {
    next(err);
  }
};


// 특정 가게의 미션 목록 조회
export const handleListStoreMissions = async (req, res, next) => {
  /*
    #swagger.summary = '특정 가게의 미션 목록 조회 API'
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '가게 ID'
    }
    #swagger.responses[200] = {
      description: "미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              success: { type: "array" },
              error: { type: "object", nullable: true }
            }
          }
        }
      }
    }
  */
  try {
    const missions = await listStoreMissions(parseInt(req.params.storeId));
    res.status(StatusCodes.OK).success(missions);
  } catch (err) {
    next(err);
  }
};

// 내가 진행 중인 미션 목록 조회
export const handleListOngoingMissions = async (req, res, next) => {
  /*
    #swagger.summary = '내가 진행 중인 미션 목록 조회 API'
    #swagger.parameters['memberId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '회원 ID'
    }
    #swagger.responses[200] = {
      description: "진행 중인 미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              success: { type: "array" },
              error: { type: "object", nullable: true }
            }
          }
        }
      }
    }
  */
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).error({ reason: "로그인이 필요합니다." });
    }
    const missions = await listMyOngoingMissions(userId);
    res.status(StatusCodes.OK).success(missions);
  } catch (err) {
    next(err);
  }
};

// 미션 완료 처리
export const handleCompleteMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 완료 처리 API'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              memberId: { type: "number" },
              missionId: { type: "number" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 완료 처리 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              success: { type: "object" },
              error: { type: "object", nullable: true }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "이미 완료된 미션 (M003)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "M003" },
              reason: { type: "string" },
              data: { type: "object" }
            },
            success: { nullable: true }
          }
        }
      }
    };
  */
  try {
    const userId = req.user?.id;
    const { missionId } = req.body;
    if (!userId || !missionId) {
      return res.status(400).error({ reason: "로그인 정보와 missionId가 필요합니다." });
    }
    const challengeId = await challengeMission({ memberId: userId, missionId });
    res.status(StatusCodes.OK).success(result);
  } catch (err) {
    next(err);
  }
};
