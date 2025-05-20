// ✅ 사용자 관련 에러
// U001: DuplicateUserEmailError - 이미 존재하는 이메일
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
// U002: UserInputError - 필수 입력값 누락 또는 잘못된 입력
export class UserInputError extends Error {
  errorCode = "U002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}



// ✅ 스토어 관련 에러
// S001: StoreInputError - 잘못된 가게 입력값
export class StoreInputError extends Error {
  errorCode = "S001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
// S002: StoreNotFoundError - 존재하지 않는 가게 조회
export class StoreNotFoundError extends Error {
  errorCode = "S002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}     



// ✅ 리뷰 관련 에러
// R001: ReviewInputError - 리뷰 작성 시 유효하지 않은 요청
export class ReviewInputError extends Error {
  errorCode = "R001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
// R002: ReviewStoreNotFoundError - 리뷰 대상 가게 없음
export class ReviewStoreNotFoundError extends Error {
  errorCode = "R002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}




// ✅ 미션 관련 에러
// M001: MissionInputError - 미션 입력값 오류
export class MissionInputError extends Error {
  errorCode = "M001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
// M002: AlreadyChallengedError - 이미 도전한 미션
export class AlreadyChallengedError extends Error {
  errorCode = "M002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
// M003: MissionCompleteError - 이미 완료된 미션
export class MissionCompleteError extends Error {
  errorCode = "M003";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
