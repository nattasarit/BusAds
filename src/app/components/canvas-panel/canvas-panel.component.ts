import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { AppService, ResponseType } from '../../services/app.service';
import { DrawService, HWXY, XY, DrawMode } from '../../services/draw.service';
import { TemplateService } from '../../services/template.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MatSelect } from '@angular/material/select';
import { ContextModel } from '../../model/context.model';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-canvas-panel',
  templateUrl: './canvas-panel.component.html',
  styleUrls: ['./canvas-panel.component.css']
})
export class CanvasPanelComponent implements OnInit {
  constructor(public appService: AppService,
    public drawService: DrawService,
    public templateService: TemplateService) { }

  @ViewChild('selectorBusRoute') selectorBusRoute: MatSelect;

  panelOpenState = false;

  private mainStage = null;
  //private containerFrame = null;
  private containerLogo = null;
  private containerProduct = null;
  private shapeContainerFrame = null;
  private shapeContainerLogo = null;
  private shapeContainerProduct = null;

  ngOnInit() {
    this.mainStage = new createjs.Stage('divCanvasContainer');

    this.initBusAdsFrame();
    this.mainStage.update();
  }

  private handleTick(event) {
    this.mainStage.update();
  }

  private initBusAdsFrame() {
    createjs.Ticker.addEventListener('tick', (evt) => this.handleTick(evt));

    // Cal
    // const topLeft = this.drawService.getCornerTopLeft(this.shapeContainerFrame.graphics.instructions);
    // const topRight = this.drawService.getCornerTopRight(this.shapeContainerFrame.graphics.instructions);
    // const width: number = this.drawService.calWidth(topLeft, topRight);

    // BusFrame
    // const busBitmap = new createjs.Bitmap('assets/images/1.png');
    // const ratioX = 500 / busBitmap.image['naturalWidth'];
    // const ratioY = 300 / busBitmap.image['naturalWidth'];
    // busBitmap.scaleX = 0.5;
    // busBitmap.scaleY = 0.5;
    // this.mainStage.addChild(busBitmap);
    // busBitmap.visible = false;
    // this.mainStage.update();

    // 1Template
    // const template1 = this.templateService.sampleTemplate1;

    let gapX = 15;
    let gapY = 20;
    //const listTemplate = this.templateService.getMatchedTemplateList();
    this.templateService.getMatchedTemplateList().subscribe(listTemplate => {
      console.log("getMatchedTemplateList listTemplate=", listTemplate);
      listTemplate.forEach(template => {
        const containerFrame = new createjs.Container();
        const offset: XY = new XY();
        offset.x = gapX;
        offset.y = gapY;
        this.drawService.drawTemplate(containerFrame, template, DrawMode.modeFrameOnly, offset);

        gapX = gapX + 340;

        const containerFrame2 = new createjs.Container();
        const offset2: XY = new XY();
        offset2.x = gapX;
        offset2.y = gapY;
        this.drawService.drawTemplate(containerFrame2, template, DrawMode.modeCombine, offset2);

        gapX = gapX + 340;

        const containerFrame3 = new createjs.Container();
        const offset3: XY = new XY();
        offset3.x = gapX;
        offset3.y = gapY;
        this.drawService.drawTemplate(containerFrame3, template, DrawMode.modeImageOnly, offset3);

        this.mainStage.addChild(containerFrame);
        this.mainStage.addChild(containerFrame2);
        this.mainStage.addChild(containerFrame3);
        this.mainStage.update();

        gapX = 15;
        gapY = gapY + 250;
      });
    });


  }

  private makeDraggable(o) {
    let offset = null;
    o.addEventListener('mousedown', (evt) => {
      offset = { x: evt.target.x - evt.stageX, y: evt.target.y - evt.stageY };
    });
    o.addEventListener('pressmove', (evt) => {
      evt.currentTarget.x = evt.stageX + offset.x;
      evt.currentTarget.y = evt.stageY + offset.y;
      o.getStage().update();
    });
  }

  getFilteringSelectValue() {
    if (1 === 1) {

    }
  }

  test() {

  }

  public submit() {

  }

}
