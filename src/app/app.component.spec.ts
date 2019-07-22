import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TestBed, async } from '@angular/core/testing';

import { AuthService } from './core/auth/auth.service';
import { AppComponent } from './app.component';


describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, events;
  let platformReadySpy, platformSpy, authSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    authSpy = jasmine.createSpyObj('AuthService', { 'isAuthenticated': true });
    events = jasmine.createSpyObj('Events', { 'subscribe': true });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Events, useValue: events },
      ],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
    expect(authSpy.isAuthenticated).toHaveBeenCalled();
  });

  it('should have menu labels', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menu = app.querySelector('ion-menu');
    expect(menu.getAttribute('disabled')).toEqual('false');
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(2);
    expect(menuItems[0].textContent).toContain('Home');
    expect(menuItems[1].textContent).toContain('List');
  });

  it('should have urls', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(2);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/home');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/list');
  });

  it('should hide menu on unauthenticated user', async () => {
    authSpy.isAuthenticated = jasmine.createSpy().and.returnValue(false);
    TestBed.overrideProvider(AuthService, { useValue: authSpy });
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menu = app.querySelector('ion-menu');
    expect(menu.getAttribute('disabled')).toEqual('true');
  });

  it('should listen to user login/logout event', async () => {
    events.subscribe = jasmine.createSpy().and.callFake(
      function(id: string, func: () => void) {
        func();
        return id;
      });
    TestBed.overrideProvider(Events, { useValue: events });
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    expect(authSpy.isAuthenticated.calls.all().length).toEqual(2);
  });
});
