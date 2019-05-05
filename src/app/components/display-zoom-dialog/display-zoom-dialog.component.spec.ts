import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayZoomDialogComponent } from './display-zoom-dialog.component';

describe('DisplayZoomDialogComponent', () => {
  let component: DisplayZoomDialogComponent;
  let fixture: ComponentFixture<DisplayZoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayZoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayZoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
