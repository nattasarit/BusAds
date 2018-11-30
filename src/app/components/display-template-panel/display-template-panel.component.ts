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
  selector: 'app-display-template-panel',
  templateUrl: './display-template-panel.component.html',
  styleUrls: ['./display-template-panel.component.css']
})
export class DisplayTemplatePanelComponent implements OnInit {

  constructor(public appService: AppService,
    public drawService: DrawService,
    public templateService: TemplateService) { }

  panelOpenState = false;

  private mainStage = null;
  private containerFrame = null;
  private containerLogo = null;
  private containerProduct = null;
  private shapeContainerFrame = null;
  private shapeContainerLogo = null;
  private shapeContainerProduct = null;

  ngOnInit() {
    this.mainStage = new createjs.Stage('divCanvasContainer2');

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

    let gapX = 120;
    let gapY = 20;
    const listTemplate = this.templateService.getAllTemplateList();
    console.log('listTemplate=', listTemplate);
    listTemplate.forEach(template => {
      this.containerFrame = new createjs.Container();
      const offset: XY = new XY();
      offset.x = gapX;
      offset.y = gapY;

      console.log('offset.x = ', offset.x);
      console.log('offset.y = ', offset.y);
      this.drawService.drawTemplate(this.containerFrame, template, DrawMode.modeFrameOnly, offset);

      gapX = gapX + 1500;

      const test = new createjs.Container();
      const newOffset: XY = new XY();
      newOffset.x = gapX;
      newOffset.y = gapY;
      console.log('newOffset.x = ', newOffset.x);
      console.log('newOffset.y = ', newOffset.y);
      this.drawService.drawTemplate(test, template, DrawMode.modeFrameOnly, newOffset);

      this.mainStage.addChild(this.containerFrame);
      this.mainStage.addChild(test);
      this.mainStage.update();

      gapX = 120;
      gapY = gapY + 250;
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
