import { Component } from '@angular/core';

import { Events, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  public hideMenu = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private events: Events,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.showHideMenuBasedOnAuthStatus();
    });
    this.events.subscribe('auth:login', () => {
      this.showHideMenuBasedOnAuthStatus();
    });
  }

  /**
   * Show/hide the menu depending on authentication status
   */
  private showHideMenuBasedOnAuthStatus(): void {
    this.hideMenu = !this.auth.isAuthenticated();
  }
}
