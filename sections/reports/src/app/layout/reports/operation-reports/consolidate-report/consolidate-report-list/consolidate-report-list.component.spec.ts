import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidateReportListComponent } from './consolidate-report-list.component';

describe('ConsolidateReportListComponent', () => {
  let component: ConsolidateReportListComponent;
  let fixture: ComponentFixture<ConsolidateReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidateReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidateReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
