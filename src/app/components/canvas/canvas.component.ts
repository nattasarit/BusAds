import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
// import * as fabric from '../../../../node_modules/fabric';
// const Fabric: any = fabric;
//import { Stage, Shape } from '@createjs/easeljs';
import { AppService, ResponseType } from '../../services/app.service';
import { DrawService, HWXY } from '../../services/draw.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MatSelect } from '@angular/material/select';
import { ContextModel } from '../../model/context.model';
import * as createjs from 'createjs-module';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {
  constructor(public appService: AppService, public drawService: DrawService) { }

  @ViewChild('selectorBusRoute') selectorBusRoute: MatSelect;

  panelOpenState = false;
  routes: Food[] = [
    { value: '1', viewValue: '21' },
    { value: '2', viewValue: '188' },
    { value: '3', viewValue: '75' }
  ];


  private mainStage = null;
  private containerFrame = null;
  private containerLogo = null;
  private containerProduct = null;
  private shapeContainerFrame = null;
  private shapeContainerLogo = null;
  private shapeContainerProduct = null;

  ngOnInit() {
    this.mainStage = new createjs.Stage("divCanvasContainer");

    this.initBusAdsFrame();
    this.mainStage.update();
  }

  private ngAfterViewInit() {

  }

  private handleTick(event) {
    this.mainStage.update();
  }

  private initBusAdsFrame() {
    createjs.Ticker.addEventListener("tick", (evt) => this.handleTick(evt));

    //BusFrame
    var busBitmap = new createjs.Bitmap("assets/images/1.png");
    console.log("busBitmap=", busBitmap);
    const ratioX = 500 / busBitmap.image["naturalWidth"];
    const ratioY = 300 / busBitmap.image["naturalWidth"];
    console.log("ratioX=", ratioX);
    console.log("ratioY=", ratioY);
    busBitmap.scaleX = 0.5;
    busBitmap.scaleY = 0.5;
    this.mainStage.addChild(busBitmap);
    busBitmap.visible = false
    this.mainStage.update();
    
    //AdsBGFrame
    this.shapeContainerFrame = new createjs.Shape();
    this.shapeContainerFrame.graphics.beginStroke("black");
    this.shapeContainerFrame.graphics.beginFill("white");
    this.shapeContainerFrame.graphics.moveTo(198, 70).lineTo(513, 70).lineTo(513, 255).lineTo(320, 255).bezierCurveTo(300, 190, 250, 190, 230, 255).lineTo(198, 255).closePath();
    this.containerFrame = new createjs.Container();
    this.containerFrame.mask = this.shapeContainerFrame;
    this.containerFrame.addChild(this.shapeContainerFrame);

    //Cal
    let topLeft = this.drawService.getCornerTopLeft(this.shapeContainerFrame.graphics.instructions);
    let topRight = this.drawService.getCornerTopRight(this.shapeContainerFrame.graphics.instructions);
    let width: number = this.drawService.calWidth(topLeft, topRight);

    //LogoFrame
    //corner top 20% left 20%
    this.shapeContainerLogo = new createjs.Shape();
    this.shapeContainerLogo.graphics.beginStroke("black");
    this.shapeContainerLogo.graphics.setStrokeDash([2, 2]);
    this.shapeContainerLogo.graphics.rect(topLeft.x, topLeft.y, 75, 75);
    this.containerLogo = new createjs.Container();
    this.containerLogo.addChild(this.shapeContainerLogo);

    //ProductFrame
    //corner top 100% right 20%
    this.shapeContainerProduct = new createjs.Shape();
    this.shapeContainerProduct.graphics.beginStroke("black");
    this.shapeContainerProduct.graphics.setStrokeDash([2, 2]);
    this.shapeContainerProduct.graphics.rect(400, 70, 113, 185);
    this.containerProduct = new createjs.Container();
    this.containerProduct.addChild(this.shapeContainerProduct);

    this.mainStage.addChild(this.containerFrame);
    this.mainStage.addChild(this.containerLogo);
    this.mainStage.addChild(this.containerProduct);
    this.mainStage.update();
  }

  private makeDraggable(o) {
    let offset = null
    o.addEventListener("mousedown", (evt) => {
      offset = { x: evt.target.x - evt.stageX, y: evt.target.y - evt.stageY };
    });
    o.addEventListener("pressmove", (evt) => {
      evt.currentTarget.x = evt.stageX + offset.x;
      evt.currentTarget.y = evt.stageY + offset.y;
      o.getStage().update();
    });
  }

  getFilteringSelectValue() {
    if (1 == 1) {

    }
  }

  _initTestData() {
    let data = new ContextModel();
    data.commandList = [
      { command: 'beginPath', x: 0, y: 0 },
      { command: 'moveTo', x: 198, y: 70 },
      { command: 'lineTo', x: 513, y: 70 },
      { command: 'lineTo', x: 513, y: 255 },
      { command: 'lineTo', x: 320, y: 255 },
      { command: 'bezierCurveTo', x: 300, y: 190, x2: 250, y2: 190, x3: 230, y3: 255 },
      { command: 'lineTo', x: 198, y: 255 },
      { command: 'closePath', x: 0, y: 0 },
    ]
    return data;
  }

  _drawFunction(context, commandList) {
    console.log("commandList=", commandList);
    commandList.commandList.forEach(commandSet => {
      switch (commandSet.command) {
        case 'beginPath':
          context.beginPath();
          break;
        case 'moveTo':
          context.moveTo(commandSet.x, commandSet.y);
          break;
        case 'lineTo':
          context.lineTo(commandSet.x, commandSet.y);
          break;
        case 'bezierCurveTo':
          context.bezierCurveTo(commandSet.x, commandSet.y, commandSet.x2, commandSet.y2, commandSet.x3, commandSet.y3);
          break;
        default:
          context.closePath();
      }
    });

  }

  _initAdsArea() {

  }

  test() {

  }

  selectImageBackGround(img) {
    console.log("img=", img);
    var bitmap = new createjs.Bitmap(img);
    bitmap.scaleX = 0.1;
    bitmap.scaleY = 0.1;

    var bitmap = new createjs.Bitmap(img);
    let m = new createjs.Matrix2D();
    // m.translate(x, y);
    m.scale(this.shapeContainerFrame.graphics.width / bitmap.image["naturalWidth"], this.shapeContainerFrame.graphics.height / bitmap.image["naturalHeight"]);
    this.shapeContainerFrame.graphics.beginBitmapFill(img, "no-repeat", m);
    this.shapeContainerFrame.graphics.moveTo(198, 70).lineTo(513, 70).lineTo(513, 255).lineTo(320, 255).bezierCurveTo(300, 190, 250, 190, 230, 255).lineTo(198, 255).closePath();
    this.mainStage.update();
  }

  selectImageLogo(img) {
    let shapeLogoHWXY: HWXY = this.drawService.getHWXYrect(this.shapeContainerLogo.graphics);
    var bitmap = new createjs.Bitmap(img);

    const naturalWidth = bitmap.image["naturalWidth"];
    const naturalHeight = bitmap.image["naturalWidth"];
    const ratioX = shapeLogoHWXY.w / naturalWidth;
    const ratioY = shapeLogoHWXY.h / naturalHeight;
    let ratio = ratioX;
    if (ratioY < ratioX) {
      ratio = ratioY;
    }
    ratio = ratio * 0.9;

    bitmap.scaleX = ratio;
    bitmap.scaleY = ratio;
    bitmap.x = shapeLogoHWXY.x;
    bitmap.y = shapeLogoHWXY.y;

    this.containerLogo.addChild(bitmap);
    this.makeDraggable(bitmap);
    this.mainStage.update();
  }

  selectImageProduct(img) {
    let shapeProductHWXY: HWXY = this.drawService.getHWXYrect(this.shapeContainerProduct.graphics);
    var bitmap = new createjs.Bitmap(img);

    const naturalWidth = bitmap.image["naturalWidth"];
    const naturalHeight = bitmap.image["naturalWidth"];
    const ratioX = shapeProductHWXY.w / naturalWidth;
    const ratioY = shapeProductHWXY.h / naturalHeight;
    let ratio = ratioX;
    if (ratioY < ratioX) {
      ratio = ratioY;
    }
    ratio = ratio * 0.9;

    bitmap.scaleX = ratio;
    bitmap.scaleY = ratio;
    bitmap.x = shapeProductHWXY.x;
    bitmap.y = shapeProductHWXY.y;

    this.containerProduct.addChild(bitmap);
    this.makeDraggable(bitmap);
    this.mainStage.update();
  }

  selectImagePresenter(img) {

  }

  public submit() {

  }

}
