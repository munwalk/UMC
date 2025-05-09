import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import {
  DuplicateUserEmailError,
  UserInputError,
} from "../errors.js";

export const userSignUp = async (data) => {
  // ✅ 1. 필수 입력값 누락 검사
  const requiredFields = ["email", "name", "gender", "birth", "address", "phoneNumber"];
  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    throw new UserInputError(
      `회원가입 필수 항목이 누락되었습니다: ${missingFields.join(", ")}`,
      data
    );
  }

  // ✅ 2. 사용자 등록
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  // ✅ 3. 선호 카테고리 저장
  for (const preference of data.preferences || []) {
    await setPreference(joinUserId, preference);
  }

  // ✅ 4. 사용자 정보 및 선호 카테고리 조회
  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
