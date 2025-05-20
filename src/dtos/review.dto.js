export const bodyToReview = (body) => {
  return {
    memberId: body.memberId,
    storeId: body.storeId,
    body: body.body,
    score: body.score,
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