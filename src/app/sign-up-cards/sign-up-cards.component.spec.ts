import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCardsComponent } from './sign-up-cards.component';

describe('SignUpCardsComponent', () => {
  let component: SignUpCardsComponent;
  let fixture: ComponentFixture<SignUpCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
