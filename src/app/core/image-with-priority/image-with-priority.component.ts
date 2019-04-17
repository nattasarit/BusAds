import { Component, OnInit, Input } from '@angular/core';
import { ImageModel } from '../../model/image.model';

@Component({
  selector: 'app-image-with-priority',
  templateUrl: './image-with-priority.component.html',
  styleUrls: ['./image-with-priority.component.css']
})
export class ImageWithPriorityComponent implements OnInit {

  constructor() { }
  selectedPriority: string;

  @Input()
  image: ImageModel = null;
  priorities = [
    {code:'A',desc:'ใหญ่'},
    {code:'B',desc:'กลาง'}, 
    {code:'C',desc:'เล็ก'}
  ];

  ngOnInit() {
    if (this.image !== null) {
      this.selectedPriority = this.image.priority;
    }
  }

  radioChange(event) {
    this.image.priority = event.value;
  }

}
