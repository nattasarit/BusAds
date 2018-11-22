import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ImageModel } from '../../model/image.model';

@Component({
  selector: 'app-upload-panel',
  templateUrl: './upload-panel.component.html',
  styleUrls: ['./upload-panel.component.css']
})
export class UploadPanelComponent implements OnInit {

  constructor() { }

  items = [];

  ngOnInit() {

  }

  public upload(event) {
    const elem = event.target;
    console.log('elem=', elem);
    if (elem.files.length > 0) {
      let count = 0;
      for (const file of elem.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = new ImageModel();
          image.image = e.target['result'];
          this.items.push(image);
          count++;

          if (count >= elem.files.length) {
            this.showImage();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  private showImage() {
    console.log('this.items=', this.items);
  }

}
