import { HttpInterceptorFn } from '@angular/common/http';

export const jsonHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const requestWithJsonAccept = req.clone({
    setHeaders: {
      Accept: 'application/json'
    }
  });

  return next(requestWithJsonAccept);
};
