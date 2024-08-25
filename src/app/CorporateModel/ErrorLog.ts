export class StudentErrorLogBM
{
    ErrorId :number;
    ErrorMessage :string;
    ErrorCode ?:number;
    RequestMethod :string;
    Message :string;
    ExceptionType: string;
    StackTrace :string;
    CreateAt ?:Date;
}