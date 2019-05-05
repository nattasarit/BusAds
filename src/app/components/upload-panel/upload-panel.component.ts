import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ImageModel } from '../../model/image.model';
import { ItemService } from '../../services/item.service';
import { AppService } from '../../services/app.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-upload-panel',
  templateUrl: './upload-panel.component.html',
  styleUrls: ['./upload-panel.component.css']
})
export class UploadPanelComponent implements OnInit {

  constructor(private itemService: ItemService,
              private appService: AppService, 
              private projectService: ProjectService) { }

  items = [];
  itemsText = [];

  ngOnInit() {
    if (this.itemService.items.length > 0) {
      this.items = this.itemService.items;
    }

    if (this.itemService.itemsText.length > 0) {
      this.itemsText = this.itemService.itemsText;
    }

  }

  public browseImage(event) {
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
          console.log("upload this.items=", this.items);
          count++;

          if (count >= elem.files.length) {
            this.itemService.items = this.items;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  clearImage() {
    this.items = [];
    this.itemService.items = [];
  }

  uploadImage(){
    let formData = new FormData();
    formData.append('REL_PROJ_ID',this.projectService.curCusProj.REL_PROJ_ID);

    for (const item of this.items){
      if(item.priority == 'A'){
        formData.append('IMAGE_A', item.image);
      }
      else if(item.priority == 'B'){
        formData.append('IMAGE_B', item.image);
      }
      else if(item.priority == 'C'){
        formData.append('IMAGE_C', item.image);
      }
    }

    this.appService.showLoading();
    this.appService.uploadImage(formData).subscribe(response => {
      this.appService.hideLoading();
      alert("บันทึกรูปภาพเรียบร้อย");
      console.log("saveUpload response=", response);
    });
  }


  public browseText(event) {
    const elem = event.target;
    console.log('elem=', elem);
    if (elem.files.length > 0) {
      let count = 0;
      for (const file of elem.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = new ImageModel();
          image.image = e.target['result'];
          this.itemsText.push(image);
          console.log("upload this.itemsText=", this.itemsText);
          count++;

          if (count >= elem.files.length) {
            this.itemService.itemsText = this.itemsText;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  clearText() {
    this.itemsText = [];
    this.itemService.itemsText = [];
  }

  uploadText(){
    let formData = new FormData();
    formData.append('REL_PROJ_ID',this.projectService.curCusProj.REL_PROJ_ID);

    for (const item of this.itemsText){
      if(item.priority == 'A'){
        formData.append('TEXT_A', item.image);
      }
      else if(item.priority == 'B'){
        formData.append('TEXT_B', item.image);
      }
      else if(item.priority == 'C'){
        formData.append('TEXT_C', item.image);
      }
    }

    this.appService.showLoading();
    this.appService.uploadText(formData).subscribe(response => {
      this.appService.hideLoading();
      console.log("saveUpload response=", response);
    });
  }

}
