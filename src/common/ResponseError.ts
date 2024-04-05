interface BodyError{
  sucess: boolean;
  message: string;
}

class ResponseError{
  body: BodyError;
  statusCode: number;

  constructor(message: string, statusCode: number = 500){
    this.statusCode = statusCode;
    this.body = {
      message,
      sucess: false
    };
  };
};

export default ResponseError;