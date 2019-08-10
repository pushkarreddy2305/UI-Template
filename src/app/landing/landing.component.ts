import { Component, OnInit, ViewEncapsulation, HostListener, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';
import { Subscription, Observable }from 'rxjs'
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  // public name;
  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private userIdle: UserIdleService) {
    // const name: Observable<string> = this.route.params.pipe(map(p => p.name));
    // console.log(name)
   }
  private logoutSubscription: Subscription;
  private timerSubscription: Subscription;
  private pingSubscription: Subscription;
  private lastChecked: number;

  ngOnInit() {
    // this.name = this.state.getName()
    // this.name = state.name;
    this.userIdle.startWatching();
    // Start watch when time is up.
    this.timerSubscription = this.userIdle.onTimerStart().subscribe();
    this.logoutSubscription = this.userIdle.onTimeout().subscribe(this.logout);
    this.pingSubscription = this.userIdle.ping$.subscribe(() => {
      if (this.lastChecked && (Date.now() - this.lastChecked > 30000)) {
          this.logout();
      }
      this.lastChecked = Date.now();
    });
  }

  ngOnDestroy() {
    this.userIdle.stopWatching();
    this.logoutSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
    this.pingSubscription.unsubscribe();
    this.lastChecked = null;
  }
  @HostListener('window:mousemove')
  refreshUserState() {
    this.userIdle.resetTimer();
  }
  logout = this.auth.logout;
}
