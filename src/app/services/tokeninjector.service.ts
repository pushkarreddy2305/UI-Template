import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const { backend: { url: backendUrl } } = environment;

@Injectable({
  providedIn: 'root'
})
export class TokeninjectorService implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url } = request;
    if (!url.includes('/login')) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.auth.token}`
        }
      });
    }
    return next.handle(request);
  }
}
