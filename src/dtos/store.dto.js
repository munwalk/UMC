export const bodyToStore = (body) => {
    return {
      regionName: body.regionName,
      storeName: body.storeName,
    };
  };