import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidateReportComponent } from './consolidate-report.component';

describe('ConsolidateReportComponent', () => {
  let component: ConsolidateReportComponent;
  let fixture: ComponentFixture<ConsolidateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
