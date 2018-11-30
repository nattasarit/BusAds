import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTemplatePanelComponent } from './display-template-panel.component';

describe('DisplayTemplatePanelComponent', () => {
  let component: DisplayTemplatePanelComponent;
  let fixture: ComponentFixture<DisplayTemplatePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTemplatePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTemplatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
