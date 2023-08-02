export class JSONResponse extends Response {
  constructor(body: any, init?: ResponseInit) {
    super(JSON.stringify(body), init);
    this.headers.set('Content-Type', 'application/json');
  }
}