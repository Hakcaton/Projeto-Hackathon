import { IResult } from "./result.interface";

export class Result {
    static OKResult(object?: any, message?: string): IResult { return <IResult>{ success: true, data: object, message } };
    static InvalidResult(object?: any, message?: string): IResult { return <IResult>{ success: false, data: object, message } };
}
