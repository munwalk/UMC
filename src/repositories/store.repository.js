import { prisma } from "../db.config.js";

export const createStore = async (regionName, storeName) => {
  const store = await prisma.store.create({
    data: {
      name: storeName,
      regionName: regionName,
    },
  });

  return {
    id: store.id,
    regionName: store.regionName,
    storeName: store.name,
  };
};

export const getAllStoreReviews = async (storeId) => {
  const reviews = await prisma.userStoreReview.findMany({
    where: { storeId },
    include: {
      user: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return reviews;
};
