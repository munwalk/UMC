export const bodyToStore = (body) => {
  return {
    regionName: body.regionName,
    storeName: body.storeName,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};