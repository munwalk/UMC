import { StatusCodes } from "http-status-codes";
import { addStore, listStoreReviews } from "../services/store.service.js";
import { bodyToStore } from "../dtos/store.dto.js";

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