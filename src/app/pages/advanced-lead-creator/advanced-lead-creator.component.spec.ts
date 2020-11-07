import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedLeadCreatorComponent } from './advanced-lead-creator.component';

describe('AdvancedLeadCreatorComponent', () => {
  let component: AdvancedLeadCreatorComponent;
  let fixture: ComponentFixture<AdvancedLeadCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedLeadCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedLeadCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
