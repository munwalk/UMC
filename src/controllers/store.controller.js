import { StatusCodes } from "http-status-codes";
import { addStore, listStoreReviews } from "../services/store.service.js";
import { bodyToStore } from "../dtos/store.dto.js";
import { getStoreById } from "../services/store.service.js";
import { StoreNotFoundError } from "../errors.js";

// 가게 등록
export const handleCreateStore = async (req, res, next) => {
  /*
    #swagger.summary = '가게 등록 API'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              address: { type: "string" },
              latitude: { type: "number", format: "float" },
              longitude: { type: "number", format: "float" }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "가게 등록 성공",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true },
            success: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                address: { type: "string" }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "가게 등록 실패 (S001)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "S001" },
              reason: { type: "string" },
              data: { type: "object" }
            },
            success: { type: "object", nullable: true }
          }
        }
      }
    }
  */
  try {
    const store = await addStore(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).success(store);
  } catch (err) {
    next(err);
  }
};

// 특정 가게의 리뷰 목록 조회
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 목록 조회 API'
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '조회할 가게 ID'
    }
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true },
            success: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  userId: { type: "number" },
                  content: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "가게 ID 없음 (S002)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "S002" },
              reason: { type: "string" }
            },
            success: { type: "object", nullable: true }
          }
        }
      }
    }
  */
  try {
    const storeId = parseInt(req.params.storeId);
    const reviews = await listStoreReviews(storeId);
    res.status(StatusCodes.OK).success(reviews);
  } catch (err) {
    next(err);
  }
};

export const handleGetStore = async (req, res, next) => {
  /*
    #swagger.summary = '가게 단건 조회 API'
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '조회할 가게 ID'
    }
    #swagger.responses[200] = {
      description: "가게 정보 조회 성공",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "SUCCESS" },
            success: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                address: { type: "string" }
              }
            },
            error: { nullable: true }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "가게 ID 없음 (S002)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "S002" },
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
    const storeId = parseInt(req.params.storeId);
    const store = await getStoreById(storeId);
    if (!store) {
      throw new StoreNotFoundError("해당 ID의 가게가 존재하지 않습니다.", { storeId });
    }
    res.status(StatusCodes.OK).success(store);
  } catch (err) {
    next(err);
  }
};
