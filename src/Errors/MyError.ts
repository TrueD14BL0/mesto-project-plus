import { NOT_FOUND, SERVER_ERROR } from "../utils/errorConstants";

export default class MyError extends Error {
  statusCode:number = 0;
  constructor(message:string, statusCode: number = SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }

  static NotFoundError(message: string){
    return new MyError(message, NOT_FOUND);
  }

}
