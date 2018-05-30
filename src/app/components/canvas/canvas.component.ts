import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import * as konva from "konva";
const Konva: any = konva;
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AppService, ResponseType } from '../../services/app.service';



@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  constructor(private afStorage: AngularFireStorage, public appService: AppService) { }

  ngOnInit() {

  }
  public _gLayer = new Konva.Layer();
  public _gWidthWindow = window.innerWidth;
  public _gHeightWindow = window.innerHeight;
  public _gStage = null;

  private ngAfterViewInit() {
    this._gStage = new Konva.Stage({
      container: 'divCanvasContainer',
      width: this._gWidthWindow,
      height: this._gHeightWindow
    });
    let rect = new Konva.Rect({
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
    // add the shape to the layer
    this._gLayer.add(rect);

    let circle = new Konva.Circle({
      x: this._gStage.getWidth() / 2,
      y: this._gStage.getHeight() / 2,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
    // add the shape to the layer
    this._gLayer.add(circle);
  }

  uploadToFirebase(file) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(file);
  }

  public upload(event) {
    console.log(event);
    const elem = event.target;
    if (elem.files.length > 0) {
      console.log(elem.files[0]);
      //this.uploadToFirebase(elem.files[0]);

      let reader = new FileReader();
      reader.onload = (e) => {
        console.log("Test");
        let image = document.createElement("img");
        // the result image data
        image.src = e.target["result"];
        const kImage = new Konva.Image({
          image: image,
          width: 100,
          height: 100,
          x: 10,
          y: 10,
          draggable: true
        });

        this._gLayer.add(kImage);
      }
      reader.readAsDataURL(elem.files[0]);
    }
  }

  checkForMIMEType(response) {
    var blob;
    if (response.mimetype == 'pdf') {
      blob = this.converBase64toBlob(response.content, 'image/png');
    } else if (response.mimetype == 'doc') {
      blob = this.converBase64toBlob(response.content, 'application/msword');
      /*Find the content types for different format of file at http://www.freeformatter.com/mime-types-list.html*/
    }
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }

  converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
  }

  public submit() {
    this._gStage.add(this._gLayer);
  }

  getBase64FromImageUrl(url) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };

    img.src = url;

    console.log("PPPPPPPPPPimg ", img);
  }
}
