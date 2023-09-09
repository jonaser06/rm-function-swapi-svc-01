export class HttpResponse {
    static defineResponse_(statusCode = 502, body: {} ) {
      return {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*',
        },
        statusCode,
        body: JSON.stringify(body),
      };
    }
    static _200(body: any){
      return this.defineResponse_(200, body);
    }
  
    static _202(body: any) {
      return this.defineResponse_(202, body);
    }
  
    static _204(body: any) {
      return this.defineResponse_(204, body);
    }
  
    static _400(body: any) {
      return this.defineResponse_(400, body);
    }
  
    static _401(body: any) {
      return this.defineResponse_(401, body);
    }
  
    static _403(body: any) {
      return this.defineResponse_(403, body);
    }
  
    static _412(body: any) {
      return this.defineResponse_(412, body);
    }
  
    static _404(body: any) {
      return this.defineResponse_(404, body);
    }
  
    static _500(body: any) {
      return this.defineResponse_(500, body);
    }
  }