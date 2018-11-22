import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSystemComponent } from './menu-system.component';

describe('MenuSystemComponent', () => {
  let component: MenuSystemComponent;
  let fixture: ComponentFixture<MenuSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
