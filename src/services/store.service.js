import { createStore, getAllStoreReviews } from "../repositories/store.repository.js";
import { StoreInputError } from "../errors.js";
import { responseFromReviews } from "../dtos/review.dto.js";

export const addStore = async ({ regionName, storeName }) => {
  if (!regionName || !storeName) {
    throw new StoreInputError("가게 이름과 지역명을 입력해주세요.", {
      regionName,
      storeName,
    });
  }

  return await createStore(regionName, storeName);
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};
