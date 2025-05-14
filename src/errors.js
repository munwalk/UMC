// ✅ 사용자 관련 에러
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class UserInputError extends Error {
    errorCode = "U002";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  // ✅ 스토어 관련 에러
  export class StoreInputError extends Error {
    errorCode = "S001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class StoreNotFoundError extends Error {
  errorCode = "S002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
  
  // ✅ 리뷰 관련 에러
  export class ReviewInputError extends Error {
    errorCode = "R001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class ReviewStoreNotFoundError extends Error {
    errorCode = "R002";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  // ✅ 미션 관련 에러
  export class MissionInputError extends Error {
    errorCode = "M001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class AlreadyChallengedError extends Error {
    errorCode = "M002";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class MissionCompleteError extends Error {
    errorCode = "M003";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
