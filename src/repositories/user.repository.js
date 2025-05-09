import { prisma } from "../db.config.js";

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

export const getUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return null;
  return [user]; // 기존 코드 호환
};

export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: { userId, foodCategoryId },
  });
};

export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    where: { userId },
    include: { foodCategory: true },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences.map((pref) => ({
    id: pref.id,
    food_category_id: pref.foodCategoryId,
    user_id: pref.userId,
    name: pref.foodCategory.name,
  }));
};