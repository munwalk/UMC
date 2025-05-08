import { prisma } from "../db.config.js";

// ✅ 사용자 등록 (중복 이메일 확인 포함)
export const addUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) return null;

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    },
  });

  return user.id;
};

// ✅ 사용자 정보 조회
export const getUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;
  return [user]; // 기존 서비스 코드 호환 위해 배열로 감쌈
};

// ✅ 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

// ✅ 사용자 선호 카테고리 조회
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    where: { userId },
    include: {
      foodCategory: true,
    },
    orderBy: {
      foodCategoryId: 'asc',
    },
  });

  return preferences.map((pref) => ({
    id: pref.id,
    food_category_id: pref.foodCategoryId,
    user_id: pref.userId,
    name: pref.foodCategory.name,
  }));
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
