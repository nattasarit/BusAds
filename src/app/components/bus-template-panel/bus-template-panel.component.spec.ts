import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTemplatePanelComponent } from './bus-template-panel.component';

describe('BusTemplatePanelComponent', () => {
  let component: BusTemplatePanelComponent;
  let fixture: ComponentFixture<BusTemplatePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusTemplatePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTemplatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
