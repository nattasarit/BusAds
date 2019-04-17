import { Component, OnInit } from '@angular/core';
import { AppService, ResponseType } from '../../services/app.service';
import { DrawService, HWXY, XY, DrawMode } from '../../services/draw.service';
import { TemplateService } from '../../services/template.service';
import * as createjs from 'createjs-module';
import { BusTemplateModel } from '../../model/bus-template.model';
import { DbconnectorService } from '../../services/dbconnector.service';

@Component({
  selector: 'app-bus-template-panel',
  templateUrl: './bus-template-panel.component.html',
  styleUrls: ['./bus-template-panel.component.css']
})
export class BusTemplatePanelComponent implements OnInit {

  constructor(public appService: AppService,
    public drawService: DrawService,
    public templateService: TemplateService,
    public dbconnector: DbconnectorService) { }

  private mainStage = null;
  private containerFrame = null;
  private shapeDraw = null;
  private drawFrame = null;
  private countClick: number = 0;
  private firstXY: XY = new XY();
  private lastXY: XY = new XY();
  private addMode = null;
  private curCommand = "";
  private commandA = [];
  private commandB = [];
  private commandC = [];

  private curArrayCommandRect = [0, 0, 0, 0];

  ngOnInit() {
    this.mainStage = new createjs.Stage('divCanvasContainerฺBusTemplate');
    this.mainStage.addEventListener('click', (evt) => this.userDraw(evt));
    this.initBusAdsFrame();

    //draw frame
    this.countClick = 0;


    this.drawFrame = new createjs.Container();
    this.mainStage.addChild(this.drawFrame);

    // this.shapeDraw = new createjs.Shape();
    // this.shapeDraw.graphics.beginStroke('red');
    // this.drawFrame.addChild(this.shapeDraw);
  }

  private handleTick(event) {
    this.mainStage.update();
  }

  private initBusAdsFrame() {
    createjs.Ticker.addEventListener('tick', (evt) => this.handleTick(evt));

    let gapX = 120;
    let gapY = 20;
    const listMainFrame = this.templateService.getAllMainFrameList();
    console.log('listTemplate=', listMainFrame);
    listMainFrame.forEach(mainFrame => {
      console.log("mainFrame=", mainFrame);
      this.containerFrame = new createjs.Container();
      const offset: XY = new XY();
      offset.x = gapX;
      offset.y = gapY;

      let sampleTemplate1: BusTemplateModel = {
        id: 1,
        name: 'templateTemp',
        MainFrame: mainFrame,
        AFrameCommand: [],
        BFrameCommand: [],
        CFrameCommand: []
      };

      this.mainStage.addChild(this.containerFrame);
      this.drawService.drawTemplate(this.containerFrame, sampleTemplate1, DrawMode.modeFrameOnly, offset);

      gapY = gapY + 250;
    });
  }

  private onCLickAdd(type) {
    console.log("type = ", type);
    this.shapeDraw = new createjs.Shape();

    switch (type) {
      case 'A':
        this.shapeDraw.graphics.beginStroke('red');
        this.countClick = 0;
        break;
      case 'B':
        this.shapeDraw.graphics.beginStroke('green');
        this.countClick = 0;
        break;
      case 'C':
        this.shapeDraw.graphics.beginStroke('blue');
        this.countClick = 0;
        break;
      case 1:
    }

    this.addMode = type;
    this.curCommand = "";
    this.curArrayCommandRect = [0, 0, 0, 0];
  }

  private onCLickClear() {
    this.drawFrame.removeChild(this.shapeDraw);
    console.log("this.curArrayCommandRect = ", this.curArrayCommandRect);
  }

  private addCommand(addMode) {
    let stringCommand = "RECT*" + this.curArrayCommandRect[0] + "*" + this.curArrayCommandRect[1] + "*" + this.curArrayCommandRect[2] + "*" + this.curArrayCommandRect[3];
    
    if (addMode == 'A') {
      if (this.checkOverSize(addMode)) {
        this.drawFrame.removeChild(this.shapeDraw);
        alert("Over Size");
      }
      else {
        this.commandA.push(stringCommand);
      }
    }
    else if (addMode == 'B') {
      if (this.checkOverSize(addMode)) {
        this.drawFrame.removeChild(this.shapeDraw);
        alert("กรอบขนาดกลางไม่สามารถใหญ่กว่ากรอบขนาดใหญ่ได้");
      }
      else {
        this.commandB.push(stringCommand);
      }
    }
    else if (addMode == 'C') {
      if (this.checkOverSize(addMode)) {
        this.drawFrame.removeChild(this.shapeDraw);
        alert("กรอบขนาดเล็กไม่สามารถใหญ่กว่ากรอบขนาดกลางและขนาดใหญ่ได้");
      }
      else {
        this.commandC.push(stringCommand);
      }
    }
  }

  private checkOverSize(addMode): boolean {
    let isOverSize:boolean = false;
    let currentSize = this.curArrayCommandRect[2] * this.curArrayCommandRect[3];
    if(addMode == "A"){

    }
    else if(addMode == "B"){
      this.commandA.forEach(command => {
        let arrCommand = command.split("*");
        let area = arrCommand[3] * arrCommand[4];
        if(currentSize > area){
          isOverSize = true;
          return;
        }
      });
    }
    else if(addMode == "C"){
      this.commandA.forEach(command => {
        let arrCommand = command.split("*");
        let area = arrCommand[3] * arrCommand[4];
        if(currentSize > area){
          isOverSize = true;
          return;
        }
      });

      this.commandB.forEach(command => {
        let arrCommand = command.split("*");
        let area = arrCommand[3] * arrCommand[4];
        if(currentSize > area){
          isOverSize = true;
          return;
        }
      });
    }

    return isOverSize;
  }

  private onCLickSave() {
    console.log("this.commandA = ", this.commandA);
    console.log("this.commandB = ", this.commandB);
    console.log("this.commandC = ", this.commandC);
    let commandA = this.commandA.length > 0 ? this.commandA : "";
    let commandB = this.commandB.length > 0 ? this.commandB : "";
    let commandC = this.commandC.length > 0 ? this.commandC : "";

    //let saveCommand = "MF=1&NAME=AAAA" + "&A=" + this.commandA + "&B=" + this.commandB + "&C=" + this.commandC;
    let saveCommand = "MF=1&NAME=AAAA" + "&A=" + commandA + "&B=" + commandB + "&C=" + commandC;
    
    console.log("##### saveCommand = ", saveCommand);
    this.dbconnector.reqDB("BUS_TEMPLATE_I", saveCommand).subscribe(response => {
      console.log("response = ", response);
      alert("Save Template Complete!!");
    });
  }

  private userDraw(evt) {
    console.log("userDraw  evt= ", evt);
    console.log("userDraw  this.countClick= ", this.countClick);
    let x = null;
    let y = null;
    let width = null;
    let height = null;

    if (this.addMode == null) {
      // S E L E C T
      
    }
    else {
      // D R A W
      switch (this.countClick) {
        case 0:
          this.drawFrame.addChild(this.shapeDraw);

          this.shapeDraw.graphics.moveTo(evt.stageX, evt.stageY);
          this.firstXY.x = evt.stageX;
          this.firstXY.y = evt.stageY;
          this.lastXY.x = evt.stageX;
          this.lastXY.y = evt.stageY;
          this.countClick++;

          this.curArrayCommandRect[0] = evt.stageX - 120;
          this.curArrayCommandRect[1] = evt.stageY - 20;

          break;
        case 1:
          this.shapeDraw.graphics.lineTo(evt.stageX, this.lastXY.y);
          this.curArrayCommandRect[2] = evt.stageX - this.lastXY.x;

          this.lastXY.x = evt.stageX;
          this.countClick++;
          break;
        case 2:
          this.shapeDraw.graphics.lineTo(this.lastXY.x, evt.stageY);
          this.curArrayCommandRect[3] = evt.stageY - this.lastXY.y;

          this.lastXY.y = evt.stageY;
          this.countClick++;
          break;
        case 3:
          this.shapeDraw.graphics.lineTo(this.firstXY.x, this.lastXY.y);
          this.shapeDraw.graphics.closePath();

          this.addCommand(this.addMode);
          this.addMode = null;
          break;
        default:
          console.log('Draw End');
          this.countClick = 99;
      }
    }
  }


}
