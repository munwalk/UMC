import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.CREATED).success(user);
  } catch (err) {
    next(err);
  }
};
