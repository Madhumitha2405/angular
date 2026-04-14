import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhReqDialog } from './wfh-req-dialog';

describe('WfhReqDialog', () => {
  let component: WfhReqDialog;
  let fixture: ComponentFixture<WfhReqDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WfhReqDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(WfhReqDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
