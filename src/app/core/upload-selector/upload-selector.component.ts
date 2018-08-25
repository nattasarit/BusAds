import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { UICarouselModule } from 'ui-carousel';

@Component({
  selector: 'app-upload-selector',
  templateUrl: './upload-selector.component.html',
  styleUrls: ['./upload-selector.component.css']
})
export class UploadSelectorComponent implements OnInit {

  constructor() { }

  @Input() title: string = 'Test';
  @ViewChild('imgSlider1') imgSlider1: ElementRef;
  @Output() selectImage: EventEmitter<any> = new EventEmitter<any>();

  items = [];

  isAddedImage: boolean = true;

  ngOnInit() {

  }

  public upload(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      console.log(elem.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        this.items = this.items.concat([{ img: e.target["result"] }]);
        this.isAddedImage = false;
        setTimeout(() => this.isAddedImage = true, 500);
      }
      reader.readAsDataURL(elem.files[0]);
    }
  }

  public submit() {

  }

  public selectCurrentImage() {
    let currentItemIndex = this.imgSlider1["currentItemIndex"];
    console.log("currentItemIndex=", currentItemIndex);
    let countItem = 0;
    this.imgSlider1["items"].forEach(item => {
      if(countItem == currentItemIndex){
        console.log("match itemIndex = ", countItem);
        if(item.el.nativeElement.children[0]){
          this.selectImage.emit(item.el.nativeElement.children[0])
        }
      }
      countItem = countItem + 1;
      console.log("countItem = ", countItem);
    });
  }

}
