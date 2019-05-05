import { Injectable } from '@angular/core';
import { Graphics } from 'createjs-module';
import { BusTemplateModel } from '../model/bus-template.model';
import * as createjs from 'createjs-module';
import { ItemService } from '../services/item.service';
import { TemplateService } from '../services/template.service';

@Injectable()
export class DrawService {

  constructor(private itemService: ItemService,
    private templateService: TemplateService) { }

  getCornerTopLeft(instructions: Array<any>): XY {
    let minX = 999999;
    let minY = 999999;
    instructions.forEach((eachInstruction) => {
      if (eachInstruction['x'] && eachInstruction['y']) {
        const x = eachInstruction['x'];
        const y = eachInstruction['y'];
        if (x < minX) {
          minX = x;
        }

        if (y < minY) {
          minY = y;
        }
      }
    });
    const topLeft = new XY();
    topLeft.x = minX;
    topLeft.y = minY;
    return topLeft;
  }

  getCornerTopRight(instructions: Array<any>): XY {
    let maxX = 0;
    let minY = 999999;
    instructions.forEach((eachInstruction) => {
      if (eachInstruction['x'] && eachInstruction['y']) {
        const x = eachInstruction['x'];
        const y = eachInstruction['y'];
        if (x > maxX) {
          maxX = x;
        }

        if (y < minY) {
          minY = y;
        }
      }
    });
    const topRight = new XY();
    topRight.x = maxX;
    topRight.y = minY;
    return topRight;
  }

  getCornerBottomLeft(instructions: Array<any>): XY {
    let minX = 999999;
    let maxY = 0;
    instructions.forEach((eachInstruction) => {
      if (eachInstruction['x'] && eachInstruction['y']) {
        const x = eachInstruction['x'];
        const y = eachInstruction['y'];
        if (x < minX) {
          minX = x;
        }

        if (y > maxY) {
          maxY = y;
        }
      }
    });
    const bottomLeft = new XY();
    bottomLeft.x = minX;
    bottomLeft.y = maxY;
    return bottomLeft;
  }

  getCornerBottomRight(instructions: Array<any>): XY {
    let maxX = 0;
    let maxY = 0;
    instructions.forEach((eachInstruction) => {
      if (eachInstruction['x'] && eachInstruction['y']) {
        const x = eachInstruction['x'];
        const y = eachInstruction['y'];
        if (x > maxX) {
          maxX = x;
        }

        if (y > maxY) {
          maxY = y;
        }
      }
    });
    const bottomRight = new XY();
    bottomRight.x = maxX;
    bottomRight.y = maxY;
    return bottomRight;
  }

  calWidth(point1: XY, point2: XY): number {
    const a1 = Math.pow(point2.x - point1.x, 2);
    const a2 = Math.pow(point2.y - point1.y, 2);
    const width = Math.sqrt(a1 + a2);
    return width;
  }

  getHWXYrect(rect: Graphics): HWXY {
    const hwxy = new HWXY();
    hwxy.h = rect.command['h'];
    hwxy.w = rect.command['w'];
    hwxy.x = rect.command['x'];
    hwxy.y = rect.command['y'];
    return hwxy;
  }

  drawTemplate(container, template: BusTemplateModel, drawMode: DrawMode, offset?: XY) {
    const offsetTemplateX = 0;
    const offsetTemplateY = 0;
    // MainFrame
    const shapeContainerFrame = new createjs.Shape();
    shapeContainerFrame.graphics.beginStroke('black');

    if (this.itemService.bgColor && drawMode == DrawMode.modeImageOnly) {
      shapeContainerFrame.graphics.beginFill(this.itemService.bgColor);
    }
    else {
      shapeContainerFrame.graphics.beginFill('white');
    }
    //shapeContainerFrame.graphics.beginLinearGradientFill(["rgba(255,198,255,1)", "rgba(0,255,0,1)"], [0, 1], 0, 50, 0,   130);


    this.drawFunction(shapeContainerFrame.graphics, template.MainFrame.MainFrameCommand, offset);
    container.mask = shapeContainerFrame;



    container.addChild(shapeContainerFrame);


    //shapeContainerFrame.graphics.beginFill('ff80ab');


    const groupObjectA = [];
    const groupObjectB = [];
    const groupObjectC = [];

    const sourceTextA = [];
    const sourceTextB = [];
    const sourceTextC = [];

    if (this.itemService.items.length > 0) {
      this.itemService.items.forEach(item => {
        switch (item.priority) {
          case 'A':
            groupObjectA.push(item);
            break;
          case 'B':
            groupObjectB.push(item);
            break;
          case 'C':
            groupObjectC.push(item);
            break;
          default:
            console.log('AA');
        }
      });
    }

    if (this.itemService.itemsText.length > 0) {
      this.itemService.itemsText.forEach(item => {
        switch (item.priority) {
          case 'A':
            sourceTextA.push(item);
            break;
          case 'B':
            sourceTextB.push(item);
            break;
          case 'C':
            sourceTextC.push(item);
            break;
          default:
            console.log('AA');
        }
      });
    }


    this._drawTemplate(container, template.AFrameCommand, drawMode, offset, 'red', groupObjectA);
    this._drawTemplate(container, template.BFrameCommand, drawMode, offset, 'green', groupObjectB);
    this._drawTemplate(container, template.CFrameCommand, drawMode, offset, 'blue', groupObjectC);

    if (template.TextAFrameCommand) {
      this._drawTextTemplate(container, template.TextAFrameCommand, drawMode, offset, 'red', sourceTextA);
    }

    if (template.TextBFrameCommand) {
      this._drawTextTemplate(container, template.TextBFrameCommand, drawMode, offset, 'green', sourceTextB);
    }

    if (template.TextCFrameCommand) {
      this._drawTextTemplate(container, template.TextCFrameCommand, drawMode, offset, 'blue', sourceTextC);
    }


  }

  _drawTemplate(container, frameCommand, drawMode, offset, strokeColor, sourceObject) {
    if (frameCommand && frameCommand.length > 0) {
      let maxSourceObject = sourceObject.length;
      let count = 0;
      frameCommand.forEach(eachFrameCommand => {
        const shapeContainer = new createjs.Shape();
        if (drawMode === DrawMode.modeImageOnly) {
          shapeContainer.graphics.beginStroke('rgba(0,0,0,0)');
        } else {
          shapeContainer.graphics.beginStroke(strokeColor);
        }
        this.drawFunction(shapeContainer.graphics, eachFrameCommand, offset);
        container.addChild(shapeContainer);
        if (drawMode !== DrawMode.modeFrameOnly) {
          if (count < maxSourceObject) {
            let image = sourceObject[count].image;
            this.addImage(image, container, shapeContainer);
            count++;
          }
        }
      });

      if (maxSourceObject > frameCommand.length) {
        //this._drawTemplate(container, frameCommand, drawMode, offset, strokeColor, groupObject);
      }
    }
  }

  _drawTextTemplate(container, frameCommand, drawMode, offset, strokeColor, sourceObject) {
    if (frameCommand.length > 0) {
      let maxSourceObject = sourceObject.length;
      let count = 0;
      frameCommand.forEach(eachFrameCommand => {
        const shapeContainer = new createjs.Shape();
        if (drawMode === DrawMode.modeImageOnly) {
          shapeContainer.graphics.beginStroke('rgba(0,0,0,0)');
        } else {
          shapeContainer.graphics.beginStroke(strokeColor).setStrokeStyle(1, "round", "bevel", 1).setStrokeDash([5, 5, 10, 10]);
        }
        this.drawFunction(shapeContainer.graphics, eachFrameCommand, offset);
        container.addChild(shapeContainer);
        if (drawMode !== DrawMode.modeFrameOnly) {
          if (count < maxSourceObject) {
            let image = sourceObject[count].image;
            this.addImage(image, container, shapeContainer);
            count++;
          }
        }
      });

      if (maxSourceObject > frameCommand.length) {
        //this._drawTemplate(container, frameCommand, drawMode, offset, strokeColor, groupObject);
      }
    }
  }

  drawFunction(context, command, offset?: XY) {
    const commandList = command.split('|');
    commandList.forEach(commandSet => {
      commandSet = commandSet.split('*');
      if (offset) {
        if (commandSet[1]) {
          commandSet[1] = Number(commandSet[1]) + Number(offset.x);
        }
        if (commandSet[2]) {
          commandSet[2] = Number(commandSet[2]) + Number(offset.y);
        }

        if (commandSet[3] && commandSet[0] !== 'RECT') {
          commandSet[3] = Number(commandSet[3]) + Number(offset.x);
        }
        if (commandSet[4] && commandSet[0] !== 'RECT') {
          commandSet[4] = Number(commandSet[4]) + Number(offset.y);
        }

        if (commandSet[5] && commandSet[0] !== 'RECT') {
          commandSet[5] = Number(commandSet[5]) + Number(offset.x);
        }
        if (commandSet[6] && commandSet[0] !== 'RECT') {
          commandSet[6] = Number(commandSet[6]) + Number(offset.y);
        }
      }

      switch (commandSet[0]) {
        case 'BP':
          context.beginPath();
          break;
        case 'MT':
          context.moveTo(commandSet[1], commandSet[2]);
          break;
        case 'LT':
          context.lineTo(commandSet[1], commandSet[2]);
          break;
        case 'CT':
          context.bezierCurveTo(commandSet[1], commandSet[2], commandSet[3], commandSet[4], commandSet[5], commandSet[6]);
          break;
        case 'CP':
          context.closePath();
          break;
        case 'RECT':   //x, y, width, height
          context.rect(commandSet[1], commandSet[2], commandSet[3], commandSet[4]);
          break;
        default:
          console.log('command not found');
      }
    });
  }

  addImage(image, container, shapeOfFrame, mainRatio?, mainOffsetY?) {
    if (image !== null) {
      const shapeHWXY: HWXY = this.getHWXYrect(shapeOfFrame.graphics);

      const bitmap = new createjs.Bitmap(image);
      const naturalWidth = bitmap.image['naturalWidth'];
      const naturalHeight = bitmap.image['naturalHeight'];

      let ratio = this.getRatio(shapeHWXY.w, naturalWidth, shapeHWXY.h, naturalHeight);

      /*
      const ratioX = shapeHWXY.w / naturalWidth;
      const ratioY = shapeHWXY.h / naturalHeight;
      let ratio = ratioX;
      if (ratioY < ratioX) {
        ratio = ratioY;
      }
      ratio = ratio * 0.9;
      */
      const newWidth = naturalWidth * ratio;
      const offsetX = (shapeHWXY.w / 2) - (newWidth / 2);
      const newHeight = naturalHeight * ratio;
      let offsetY = (shapeHWXY.h / 2) - (newHeight / 2);

      if (mainRatio) {
        ratio = ratio * mainRatio;
      }

      bitmap.scaleX = ratio;
      bitmap.scaleY = ratio;

      if (mainOffsetY) {
        offsetY = offsetY - mainOffsetY;
      }


      //bitmap.x = Number(shapeHWXY.x) + (Number(offsetX) * 3);
      bitmap.x = Number(shapeHWXY.x) + Number(offsetX);
      bitmap.y = Number(shapeHWXY.y) + Number(offsetY);

      container.addChild(bitmap);
    }
  }

  getRatio(width1, width2, height1, height2) {
    const ratioX = width1 / width2;
    const ratioY = height1 / height2;
    let ratio = ratioX;
    if (ratioY < ratioX) {
      ratio = ratioY;
    }
    // ratio = ratio * 0.9;
    return ratio;
  }

  getBounds(obj) {
    var bounds = { x: Infinity, y: Infinity, width: 0, height: 0 };
    if (obj instanceof createjs.Container) {
      var children = obj.children, l = children.length, cbounds, c;
      for (c = 0; c < l; c++) {
        cbounds = this.getBounds(children[c]);
        if (cbounds.x < bounds.x) bounds.x = cbounds.x;
        if (cbounds.y < bounds.y) bounds.y = cbounds.y;
        if (cbounds.width < bounds.width) bounds.width = cbounds.width;
        if (cbounds.height < bounds.height) bounds.height = cbounds.height;
      }
    } else {
      var gp, gp2, gp3, gp4, imgr;
      if (obj instanceof createjs.Bitmap) {
        imgr = obj.image;
      } else {
        return bounds;
      }

      gp = obj.localToGlobal(0, 0);
      gp2 = obj.localToGlobal(imgr.width, imgr.height);
      gp3 = obj.localToGlobal(imgr.width, 0);
      gp4 = obj.localToGlobal(0, imgr.height);

      bounds.x = Math.min(Math.min(Math.min(gp.x, gp2.x), gp3.x), gp4.x);
      bounds.y = Math.min(Math.min(Math.min(gp.y, gp2.y), gp3.y), gp4.y);
      bounds.width = Math.max(Math.max(Math.max(gp.x, gp2.x), gp3.x), gp4.x) - bounds.x;
      bounds.height = Math.max(Math.max(Math.max(gp.y, gp2.y), gp3.y), gp4.y) - bounds.y;
    }

    return bounds;
  }
}

export class XY {
  x: number;
  y: number;
}

export class HWXY {
  h: number;
  w: number;
  x: number;
  y: number;
}

export enum DrawMode {
  modeImageOnly,
  modeFrameOnly,
  modeCombine
}
