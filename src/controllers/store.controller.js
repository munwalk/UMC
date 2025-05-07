import { addStore } from "../services/store.service.js";

export const handleCreateStore = async (req, res, next) => {
    try {
      const { regionName, storeName } = req.body;
  
      if (!regionName || !storeName) {
        return res.status(400).json({ message: "regionName과 storeName이 필요합니다." });
      }
  
      console.log("가게 추가 요청:", regionName, storeName);
  
      res.status(201).json({
        message: "가게 추가 성공!",
        region: regionName,
        store: storeName,
        storeId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "서버 에러 발생" });
    }
  };

  export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
  };