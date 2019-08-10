import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService, User, AuthMessage, MessageTypes } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  user: User = new User();
  message = AuthMessage;
  get MessageTypes() {
    return MessageTypes;
  }
  @Output() userName: EventEmitter<any> = new EventEmitter();
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.user)
    .subscribe((res)=> {
      console.log(res)
      if (res.success === true) {
      this.userName.emit(this.user.name)
      this.router.navigate(['/dashboard'],);
      }
      else {
        alert('incorrect username/password combination')
      }
    })
    // .catch(err=> console.log(err))
    // .then(() => {
    //   this.router.navigate(['/dashboard']);
    // }, this.auth.logout);
  }
}
