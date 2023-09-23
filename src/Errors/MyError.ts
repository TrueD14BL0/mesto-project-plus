import { INCORRECT_LOGIN, INCORRECT_LOGIN_MESSAGE, NOT_FOUND, SERVER_ERROR } from "../utils/error-constants";

export default class MyError extends Error {
  statusCode:number = 0;
  constructor(message:string, statusCode: number = SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }

  static NotFoundError(message: string){
    return new MyError(message, NOT_FOUND);
  }

  static IncorrectLoginError(){
    return new MyError(INCORRECT_LOGIN_MESSAGE, INCORRECT_LOGIN);
  }

}
