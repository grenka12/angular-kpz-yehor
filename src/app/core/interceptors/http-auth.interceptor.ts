import { HttpInterceptorFn } from '@angular/common/http';

export const httpAuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Outgoing request:', req.method, req.urlWithParams);
  return next(req);
};
