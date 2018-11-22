import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithPriorityComponent } from './image-with-priority.component';

describe('ImageWithPriorityComponent', () => {
  let component: ImageWithPriorityComponent;
  let fixture: ComponentFixture<ImageWithPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWithPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWithPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
