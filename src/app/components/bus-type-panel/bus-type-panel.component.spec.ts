import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTypePanelComponent } from './bus-type-panel.component';

describe('BusTypePanelComponent', () => {
  let component: BusTypePanelComponent;
  let fixture: ComponentFixture<BusTypePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusTypePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTypePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
