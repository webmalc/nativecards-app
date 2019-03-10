import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundPage } from './page-not-found.page';

describe('PageNotFoundPage', () => {
  let component: PageNotFoundPage;
  let fixture: ComponentFixture<PageNotFoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have link the home page', () => {
    const app = fixture.nativeElement;
    const button = app.querySelector('ion-button');
    expect(button.getAttribute('routerLink')).toEqual('/');
  });

  it('should have the error code', () => {
    const app = fixture.nativeElement;
    const title = app.querySelector('ion-title');
    expect(title.innerHTML).toContain('404');
  });
});
