interface BodySuceess{
  success: boolean;
  message: string;
  data: object | string;
}

class ResponseSuccess{
  body: BodySuceess;
  statusCode: number;

  constructor(data?: object | string, message?: string){
    this.statusCode= 200;
    this.body = {
      message: message || 'success',
      success: true,
      data: data || []
    };
  };
};

export default ResponseSuccess;