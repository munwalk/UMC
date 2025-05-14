import { StatusCodes } from "http-status-codes";
import { addStore, listStoreReviews } from "../services/store.service.js";
import { bodyToStore } from "../dtos/store.dto.js";
import { getStoreById } from "../services/store.service.js";
import { StoreNotFoundError } from "../errors.js";

export const handleCreateStore = async (req, res, next) => {
  try {
    const store = await addStore(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).success(store);
  } catch (err) {
    next(err);
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const reviews = await listStoreReviews(storeId);
    res.status(StatusCodes.OK).success(reviews);
  } catch (err) {
    next(err);
  }
};

export const handleGetStore = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const store = await getStoreById(storeId);
    if (!store) {
      throw new StoreNotFoundError("해당 ID의 가게가 존재하지 않습니다.", { storeId });
    }
    res.status(StatusCodes.OK).success(store);
  } catch (err) {
    next(err);
  }
};
