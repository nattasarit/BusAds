import { Component, OnInit, Input } from '@angular/core';
import { ImageModel } from '../../model/image.model';

@Component({
  selector: 'app-image-with-priority',
  templateUrl: './image-with-priority.component.html',
  styleUrls: ['./image-with-priority.component.css']
})
export class ImageWithPriorityComponent implements OnInit {

  constructor() { }

  @Input()
  image: ImageModel;
  priorities = ['A', 'B', 'C'];

  ngOnInit() {
  }

}
