import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonpopupComponent } from './commonpopup.component';

describe('CommonpopupComponent', () => {
  let component: CommonpopupComponent;
  let fixture: ComponentFixture<CommonpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
