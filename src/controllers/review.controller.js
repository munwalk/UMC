import {
  addReviewService,
  listMyReviewsService,
  listStoreReviewsService,
} from "../services/review.service.js";

// 리뷰 추가
export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.summary = '리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              memberId: { type: "number" },
              content: { type: "string" }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "리뷰 작성 성공",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "SUCCESS" },
            success: {
              type: "object",
              properties: {
                id: { type: "number" },
                content: { type: "string" }
              }
            },
            error: { type: "object", nullable: true }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "리뷰 작성 실패 (R001)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "R001" },
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
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).error({ reason: "로그인이 필요합니다." });
    }

    const review = await addReviewService({ ...req.body, userId });
    res.status(201).success(review);
  } catch (err) {
    next(err);
  }
};

// 특정 상점의 리뷰 목록 조회
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '리뷰를 조회할 가게 ID'
    }
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      store: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" }
                        }
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          email: { type: "string" },
                          name: { type: "string" }
                        }
                      },
                      content: { type: "string" }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "리뷰 대상 스토어가 존재하지 않음 (R002)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "R002" },
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
    const { storeId } = req.params;
    const reviews = await listStoreReviewsService(parseInt(storeId));
    res.status(200).success(reviews);
  } catch (err) {
    next(err);
  }
};

// 내가 작성한 리뷰 목록 조회
export const handleListMyReviews = async (req, res, next) => {
  /*
    #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
    #swagger.parameters['memberId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '리뷰를 작성한 회원 ID'
    }
    #swagger.responses[200] = {
      description: "내 리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "SUCCESS" },
            success: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  content: { type: "string" },
                  storeId: { type: "number" }
                }
              }
            },
            error: { type: "object", nullable: true }
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

    const reviews = await listMyReviewsService(userId);
    res.status(200).success(reviews);
  } catch (err) {
    next(err);
  }
};