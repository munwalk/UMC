import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "잘못된 입력 오류 (U002)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "U002" },
              reason: { type: "string" },
              data: { type: "object" }
            },
            success: { type: "object", nullable: true }
          }
        }
      }
    };
    #swagger.responses[409] = {
      description: "중복 이메일 오류 (U001)",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "U001" },
              reason: { type: "string" },
              data: { type: "object" }
            },
            success: { type: "object", nullable: true }
          }
        }
      }
    };
  */
  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.CREATED).success(user);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateMyInfo = async (req, res, next) => {
  /*
    #swagger.summary = '내 정보 수정 API';
    #swagger.description = '로그인한 사용자가 자신의 정보를 수정할 수 있는 API입니다.'
    #swagger.tags = ['Users']
    #swagger.security = [{ "cookieAuth": [] }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", example: "홍길동" },
              gender: { type: "string", example: "남성" },
              birth: { type: "string", format: "date", example: "1990-01-01" },
              address: { type: "string", example: "서울시 강남구" },
              detailAddress: { type: "string", example: "테헤란로 123" },
              phoneNumber: { type: "string", example: "010-1234-5678" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "정보 수정 성공",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "null" },
            success: {
              type: "object",
              properties: {
                message: { type: "string", example: "사용자 정보가 성공적으로 수정되었습니다." },
                user: {
                  type: "object",
                  properties: {
                    id: { type: "number", example: 12 },
                    email: { type: "string", example: "user@example.com" },
                    name: { type: "string", example: "홍길동" },
                    gender: { type: "string", example: "남성" },
                    birth: { type: "string", format: "date", example: "1990-01-01" },
                    address: { type: "string", example: "서울시 강남구" },
                    detailAddress: { type: "string", example: "테헤란로 123" },
                    phoneNumber: { type: "string", example: "010-1234-5678" }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[401] = {
      description: "로그인되지 않은 사용자",
      content: {
        "application/json": {
          schema: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              errorCode: { type: "string", example: "unknown" },
              reason: { type: "string", example: "로그인이 필요합니다." },
              data: { type: "null" }
            },
            success: { type: "null" }
          }
        }
      }
    }
  */
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).error({ reason: "로그인이 필요합니다." });
    }

    const {
      name,
      gender,
      birth,
      address,
      detailAddress,
      phoneNumber,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(gender && { gender }),
        ...(birth && { birth: new Date(birth) }),
        ...(address && { address }),
        ...(detailAddress && { detailAddress }),
        ...(phoneNumber && { phoneNumber }),
      },
    });

    return res.success({
      message: "사용자 정보가 성공적으로 수정되었습니다.",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
