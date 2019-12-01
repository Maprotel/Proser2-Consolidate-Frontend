import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallEntrySubheaderComponent } from './call-entry-subheader.component';

describe('CallEntrySubheaderComponent', () => {
  let component: CallEntrySubheaderComponent;
  let fixture: ComponentFixture<CallEntrySubheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallEntrySubheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallEntrySubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
