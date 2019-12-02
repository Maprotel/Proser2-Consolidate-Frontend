import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallEntryStatsComponent } from './call-entry-stats.component';

describe('CallEntryStatsComponent', () => {
  let component: CallEntryStatsComponent;
  let fixture: ComponentFixture<CallEntryStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallEntryStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallEntryStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
