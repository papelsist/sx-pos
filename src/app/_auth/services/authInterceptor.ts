import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AuthService} from 'app/_auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(
    private injector: Injector
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Interceptando: ', req.url);
    this.authService = this.injector.get(AuthService); // get it here within intercept
    const cloneRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authService.getToken()}`),
    });
    return next.handle(cloneRequest);
  }

}
