import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as konva from "konva";
const Konva: any = konva;
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  constructor(private afStorage: AngularFireStorage) { }

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
    let circle = new Konva.Circle({
      x: this._gStage.getWidth() / 2,
      y: this._gStage.getHeight() / 2,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });

    // add the shape to the layer
    //layer.add(circle);

    // add the shape to the layer
    this._gLayer.add(rect);


  }

  upload(event) {
    console.log("############# upload=",event);
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    console.log("############# this.ref=",this.ref);
    this.task = this.ref.put(event.target.files[0]);
    
  }

  public upload2(event) {
    console.log(event);
    const elem = event.target;
    if (elem.files.length > 0) {
      console.log(elem.files[0]);
      let reader = new FileReader();
      // it's onload event and you forgot (parameters)
      
      reader.onload = (e)=> {
        let image = document.createElement("img");
        // the result image data
        image.src = e.target["result"];
        const kImage = new Konva.Image({ 
          image: image,
          width: 100,
          height: 100,
          x: 10,
          y: 10
        });
        
        this._gLayer.add(kImage);
        
      }
      
      // you have to declare the file loading
      reader.readAsDataURL(elem.files[0]);
      let circle = new Konva.Circle({
        x: 100,
        y: 100,
        radius: 30,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      });

      // add the shape to the layer
      this._gLayer.add(circle);

    }
    // ...
  }

  public submit() {
    this._gStage.add(this._gLayer);
  }

  public connectFirebase(){
   
  }

}
