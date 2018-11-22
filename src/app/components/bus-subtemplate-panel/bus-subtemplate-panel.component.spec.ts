import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSubtemplatePanelComponent } from './bus-subtemplate-panel.component';

describe('BusSubtemplatePanelComponent', () => {
  let component: BusSubtemplatePanelComponent;
  let fixture: ComponentFixture<BusSubtemplatePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusSubtemplatePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSubtemplatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
