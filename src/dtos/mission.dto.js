export const bodyToMission = (body) => {
  return {
    storeId: body.storeId,
    reward: body.reward,
    missionSpec: body.missionSpec,
  };
};

export const bodyToChallengeMission = (body) => {
  return {
    memberId: body.memberId,
    missionId: body.missionId,
  };
};
