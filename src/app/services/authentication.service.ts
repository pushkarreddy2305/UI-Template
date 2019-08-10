import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router, CanActivate, UrlTree} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

export enum MessageTypes {
  WARNING,
  ERROR
}

export class Message {
  constructor(private text: string = '', private type: MessageTypes = MessageTypes.ERROR) {
  }
}

export const AuthMessage: BehaviorSubject<Message> = new BehaviorSubject(null);

export class User {
  name: string;
  pass: string;
}

export class State {
  name: string
}

export class Status {
  success: boolean;
}

const {
  backend: {
    url: backendUrl
  }
} = environment;

const tokenKey = 'tempToken';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check to see if a user has a valid token
    if (sessionStorage.getItem(tokenKey)) {
      return true;
    }
    // return this.router.parseUrl('/login');
    return true;
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  

  onLogout = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {

  }

  logout = () => {
    this.onLogout.next(true);
    sessionStorage.removeItem(tokenKey);
    // this.httpClient.post('/log', {
    //   name,
    //   timestamp: new Date(),
    //   type: 'logout'
    // }).toPromise()
    this.router.navigate(['/login']);
  }

  get token(): string {
    return sessionStorage.getItem(tokenKey) || '';
  }

  authenticate = ({name = null, pass = null}: User): Observable<Status> =>{
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    let options = new HttpParams().set('username', name).set('password', pass)
    console.log(options, 'options')
    // AuthMessage.next(null);
    return this.http.post<Status>(`${backendUrl}/auth`, options )
    // .next(
    //   data  => {
    //   console.log(data)
    //   return data
    //   },
    //   error  => {
    //   return error
    //   } 
    //   );



    // return this.httpClient
    //   .post(`${backendUrl}/auth`, {
    //     username: name,
    //     password
    //   }, {headers}).toPromise()
      // .then((res: any) => {
      //   console.log(res, 'hit')
      //   const {token} = res;
      //   if (token) {
      //     this.onLogout.next(false);
      //     sessionStorage.setItem(tokenKey, token);
      //     // return this.httpClient.post('/log', {
      //     //   name,
      //     //   timestamp: new Date(),
      //     //   type: 'login'
      //     // }).toPromise()
      //   } else {
      //     AuthMessage.next(new Message('Invalid Login'));
      //     // return this.httpClient.post('/log', {
      //     //   name,
      //     //   timestamp: new Date(),
      //     //   type: 'failedLogin'
      //     // }).toPromise().then(() => Promise.reject(), () => Promise.reject());
      //   }
      // }, (err) => {
      //   AuthMessage.next(new Message('Unable to login'));
      // });
  }
}
