import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as konva from "konva";
const Konva : any = konva;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });
    var layer = new Konva.Layer();
    var rect = new Konva.Rect({
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
    var circle = new Konva.Circle({
      x: stage.getWidth() / 2,
      y: stage.getHeight() / 2,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });

    // add the shape to the layer
    //layer.add(circle);
    // add the shape to the layer
    layer.add(rect);
    // add the layer to the stage
    stage.add(layer);
  }

}
