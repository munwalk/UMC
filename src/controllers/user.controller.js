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
