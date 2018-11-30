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
    shapeContainerFrame.graphics.beginFill('white');
    this.drawFunction(shapeContainerFrame.graphics, template.MainFrameCommand, offset);
    container.mask = shapeContainerFrame;
    container.addChild(shapeContainerFrame);

    const groupObjectA = [];
    const groupObjectB = [];
    const groupObjectC = [];

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

    // AFrame
    if (template.AFrameCommand.length > 0) {
      const shapeAContainer = new createjs.Shape();
      if (drawMode === DrawMode.modeImageOnly) {
        shapeAContainer.graphics.beginStroke('rgba(0,0,0,0)');
      } else {
        shapeAContainer.graphics.beginStroke('red');
      }
      this.drawFunction(shapeAContainer.graphics, template.AFrameCommand, offset);
      container.addChild(shapeAContainer);
      this.addImageToTemplate(container, shapeAContainer, groupObjectA, drawMode, offset);
    }

    // BFrame
    if (template.BFrameCommand.length > 0) {
      const shapeBContainer = new createjs.Shape();
      if (drawMode === DrawMode.modeImageOnly) {
        shapeBContainer.graphics.beginStroke('rgba(0,0,0,0)');
      } else {
        shapeBContainer.graphics.beginStroke('green');
      }
      this.drawFunction(shapeBContainer.graphics, template.BFrameCommand, offset);
      container.addChild(shapeBContainer);
      this.addImageToTemplate(container, shapeBContainer, groupObjectB, drawMode, offset);
    }

    // CFrame
    if (template.CFrameCommand.length > 0) {
      const shapeCContainer = new createjs.Shape();
      if (drawMode === DrawMode.modeImageOnly) {
        shapeCContainer.graphics.beginStroke('rgba(0,0,0,0)');
      } else {
        shapeCContainer.graphics.beginStroke('blue');
      }
      this.drawFunction(shapeCContainer.graphics, template.CFrameCommand, offset);
      container.addChild(shapeCContainer);
      this.addImageToTemplate(container, shapeCContainer, groupObjectC, drawMode, offset);
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
        case 'RECT':
          context.rect(commandSet[1], commandSet[2], commandSet[3], commandSet[4]);
          break;
        default:
          console.log('command not found');
      }
    });
  }

  addImageToTemplate(container, shapeOfFrame, groupObject, drawMode: DrawMode, mainOffset?: XY) {
    let image = null;
    if (groupObject.length > 0) {
      if (groupObject.length === 1) {
        image = groupObject[0].image;
        if (drawMode !== DrawMode.modeFrameOnly) {
          this.addImage(image, container, shapeOfFrame);
        }
      } else {
        // Matching SubTemplate
        console.log('groupObject = ', groupObject);

        const XYTopLeftFrame: XY = this.getCornerTopLeft(shapeOfFrame.graphics.instructions);
        const shapeFrameHWXY: HWXY = this.getHWXYrect(shapeOfFrame.graphics);

        const subTemplate = this.templateService.sampleSubTemplate1;

        const listDrawSubTemplate = Array();
        if (subTemplate.Frame1Command) {
          listDrawSubTemplate.push(subTemplate.Frame1Command);
        }
        if (subTemplate.Frame2Command) {
          listDrawSubTemplate.push(subTemplate.Frame2Command);
        }
        if (subTemplate.Frame3Command) {
          listDrawSubTemplate.push(subTemplate.Frame3Command);
        }
        if (subTemplate.Frame4Command) {
          listDrawSubTemplate.push(subTemplate.Frame4Command);
        }

        console.log('listDrawSubTemplate=', listDrawSubTemplate);

        /*
        listDrawSubTemplate.forEach(subTemplateFrameCommand => {
          const shapeSubTemplate = new createjs.Shape();

          ////////////////// 1
          if (drawMode === DrawMode.modeImageOnly) {
            shapeSubTemplate.graphics.beginStroke('rgba(0,0,0,0)');
          } else {
            shapeSubTemplate.graphics.beginStroke('black');
            shapeSubTemplate.graphics.setStrokeDash([2, 2]);
          }

          this.drawFunction(shapeSubTemplate.graphics, subTemplateFrameCommand, XYTopLeftFrame);

          const subTemplateHWXY = this.getHWXYrect(shapeSubTemplate.graphics);
          // const ratio = this.getRatio(subTemplateHWXY.w, topLeftFrameHWXY.w, subTemplateHWXY.h, topLeftFrameHWXY.h);

          // shapeSubTemplate.scaleX = ratio;
          // shapeSubTemplate.scaleY = ratio;

          // const newWidth = topLeftFrameHWXY.w * ratio;
          // const offsetX = (subTemplateHWXY.w / 2) - (newWidth / 2);
          // const newHeight = topLeftFrameHWXY.h * ratio;
          // const offsetY = (subTemplateHWXY.h / 2) - (newHeight / 2);

          // console.log('newWidth = ', newWidth);
          // console.log('offsetX = ', offsetX);
          // console.log('newHeight = ', newHeight);
          // console.log('offsetY = ', offsetY);

          // shapeSubTemplate.x = Number(shapeSubTemplate.x) + Number(offsetX);
          // shapeSubTemplate.y = Number(shapeSubTemplate.y) + Number(offsetY);

          // container.addChild(shapeSubTemplate);
          if (drawMode !== DrawMode.modeFrameOnly) {
            this.addImage(groupObject[0].image, container, shapeSubTemplate);
          }
        });
        */

        const listShapeSubTemplate = Array();
        const maxTopLeft: XY = new XY();
        maxTopLeft.x = 999999;
        maxTopLeft.y = 999999;
        const maxTopRight: XY = new XY();
        maxTopRight.x = 0;
        maxTopRight.y = 999999;
        const maxBottomLeft: XY = new XY();
        maxBottomLeft.x = 999999;
        maxBottomLeft.y = 0;
        const maxBottomRight: XY = new XY();
        maxBottomRight.x = 0;
        maxBottomRight.y = 0;

        listDrawSubTemplate.forEach(subTemplateFrameCommand => {
          const shapeSubTemplate = new createjs.Shape();
          if (drawMode === DrawMode.modeImageOnly) {
            shapeSubTemplate.graphics.beginStroke('rgba(0,0,0,0)');
          } else {
            shapeSubTemplate.graphics.beginStroke('black');
            shapeSubTemplate.graphics.setStrokeDash([2, 2]);
          }

          this.drawFunction(shapeSubTemplate.graphics, subTemplateFrameCommand, XYTopLeftFrame);
          listShapeSubTemplate.push(shapeSubTemplate);

          const subTemplateHWXY: HWXY = this.getHWXYrect(shapeSubTemplate.graphics);
          const subTemplateTopLeft: XY = new XY();
          subTemplateTopLeft.x = Number(subTemplateHWXY.x);
          subTemplateTopLeft.y = Number(subTemplateHWXY.y);

          const subTemplateTopRight: XY = new XY();
          subTemplateTopRight.x = Number(subTemplateHWXY.x) + Number(subTemplateHWXY.w);
          subTemplateTopRight.y = Number(subTemplateHWXY.y);

          const subTemplateBottomLeft: XY = new XY();
          subTemplateBottomLeft.x = Number(subTemplateHWXY.x);
          subTemplateBottomLeft.y = Number(subTemplateHWXY.y) + Number(subTemplateHWXY.h);

          const subTemplateBottomRight: XY = new XY();
          subTemplateBottomRight.x = Number(subTemplateHWXY.x) + Number(subTemplateHWXY.w);
          subTemplateBottomRight.y = Number(subTemplateHWXY.y) + Number(subTemplateHWXY.h);

          if (subTemplateTopLeft.x < maxTopLeft.x) {
            maxTopLeft.x = subTemplateTopLeft.x;
          }
          if (subTemplateTopLeft.y < maxTopLeft.y) {
            maxTopLeft.y = subTemplateTopLeft.y;
          }

          if (subTemplateTopRight.x > maxTopRight.x) {
            maxTopRight.x = subTemplateTopRight.x;
          }
          if (subTemplateTopRight.y < maxTopRight.y) {
            maxTopRight.y = subTemplateTopRight.y;
          }

          if (subTemplateBottomLeft.x < maxBottomLeft.x) {
            maxBottomLeft.x = subTemplateBottomLeft.x;
          }
          if (subTemplateBottomLeft.y > maxBottomLeft.y) {
            maxBottomLeft.y = subTemplateBottomLeft.y;
          }

          if (subTemplateBottomRight.x > maxBottomRight.x) {
            maxBottomRight.x = subTemplateBottomRight.x;
          }
          if (subTemplateBottomRight.y > maxBottomRight.y) {
            maxBottomRight.y = subTemplateBottomRight.y;
          }


        });

        const shapeSubTemplateContainer = new createjs.Shape();
        shapeSubTemplateContainer.graphics.beginStroke('red');
        shapeSubTemplateContainer.graphics.rect(maxTopLeft.x,
          maxTopLeft.y,
          Number(maxTopRight.x) - Number(maxTopLeft.x),
          Number(maxBottomLeft.y) - Number(maxTopLeft.y));
        // container.addChild(shapeSubTemplateContainer);

        const shapeSubTemplateContainerHWXY = this.getHWXYrect(shapeSubTemplateContainer.graphics);

        const ratio = this.getRatio(shapeFrameHWXY.w, shapeSubTemplateContainerHWXY.w, shapeFrameHWXY.h, shapeSubTemplateContainerHWXY.h);

        console.log('ratio=', ratio);
        let lastHeight = 0;
        let count = 0;
        listShapeSubTemplate.forEach(eachShapeSubTemplate => {
          const eachShapeSubTemplateHWXY = this.getHWXYrect(eachShapeSubTemplate.graphics);

          // eachShapeSubTemplate.scaleX = ratio;
          // eachShapeSubTemplate.scaleY = ratio;

          const newWidth = eachShapeSubTemplateHWXY.w * ratio;
          const offsetX = (shapeFrameHWXY.w / 2) - (newWidth / 2);
          const newHeight = eachShapeSubTemplateHWXY.h * ratio;
          const offsetY = (shapeFrameHWXY.h / 2) - (newHeight / 2);

          // eachShapeSubTemplate.x = Number(eachShapeSubTemplateHWXY.x) + Number(offsetX);
          // eachShapeSubTemplate.y = Number(eachShapeSubTemplateHWXY.y) + Number(offsetY);

          const x = Number(eachShapeSubTemplateHWXY.x) - (Number(eachShapeSubTemplateHWXY.x) * ratio) + offsetX;
          // const y = Number(eachShapeSubTemplateHWXY.y) - (Number(eachShapeSubTemplateHWXY.y) * ratio) - lastHeight;
          const y = Number(eachShapeSubTemplateHWXY.y) - (Number(eachShapeSubTemplateHWXY.y) * ratio) - lastHeight;


          eachShapeSubTemplate.scaleX = ratio;
          eachShapeSubTemplate.scaleY = ratio;
          eachShapeSubTemplate.x = x;
          eachShapeSubTemplate.y = y;

          container.addChild(eachShapeSubTemplate);
          if (drawMode !== DrawMode.modeFrameOnly) {
            this.addImage(groupObject[count].image, container, eachShapeSubTemplate, ratio, lastHeight);
            count ++;
          }

          // lastHeight = newHeight;
          lastHeight = (eachShapeSubTemplateHWXY.h - newHeight);
        });




        /*

        const shapeSubTemplate1 = new createjs.Shape();

        ////////////////// 1

        if (drawMode === DrawMode.modeImageOnly) {
          shapeSubTemplate1.graphics.beginStroke('rgba(0,0,0,0)');
        } else {
          shapeSubTemplate1.graphics.beginStroke('black');
          shapeSubTemplate1.graphics.setStrokeDash([2, 2]);
        }
        this.drawFunction(shapeSubTemplate1.graphics, subTemplate.Frame1Command, XYTopLeftFrame);
        container.addChild(shapeSubTemplate1);
        if (drawMode !== DrawMode.modeFrameOnly) {
          this.addImage(groupObject[0].image, container, shapeSubTemplate1);
        }

        ////////////////// 2

        const shapeSubTemplate2 = new createjs.Shape();

        if (drawMode === DrawMode.modeImageOnly) {
          shapeSubTemplate2.graphics.beginStroke('rgba(0,0,0,0)');
        } else {
          shapeSubTemplate2.graphics.beginStroke('black');
          shapeSubTemplate2.graphics.setStrokeDash([2, 2]);
        }
        this.drawFunction(shapeSubTemplate2.graphics, subTemplate.Frame2Command, XYTopLeftFrame);

        const subTemplateHWXY = this.getHWXYrect(shapeSubTemplate2.graphics);
        const ratio = this.getRatio(subTemplateHWXY.w, topLeftFrameHWXY.w, subTemplateHWXY.h, topLeftFrameHWXY.h);
        shapeSubTemplate2.scaleX = ratio;
        shapeSubTemplate2.scaleY = ratio;
        container.addChild(shapeSubTemplate2);
        if (drawMode !== DrawMode.modeFrameOnly) {
          this.addImage(groupObject[1].image, container, shapeSubTemplate2);
        }

        */
      }
    }
  }

  addImage(image, container, shapeOfFrame, mainRatio?, mainOffsetY?) {
    if (image !== null) {
      const shapeHWXY: HWXY = this.getHWXYrect(shapeOfFrame.graphics);
      console.log('addImage shapeHWXY = ', shapeHWXY);

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


      bitmap.x = Number(shapeHWXY.x) + (Number(offsetX) * 3);
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
