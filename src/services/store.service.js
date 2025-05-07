import { createStore } from "../repositories/store.repository.js";

export const addStore = async ({ regionName, storeName }) => {
  return await createStore(regionName, storeName);
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};