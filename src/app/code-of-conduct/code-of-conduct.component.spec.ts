import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeofConductComponent } from './code-of-conduct.component';

describe('CodeofConductComponent', () => {
  let component: CodeofConductComponent;
  let fixture: ComponentFixture<CodeofConductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeofConductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeofConductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
