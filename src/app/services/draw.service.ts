import { Injectable } from '@angular/core';
import { Graphics } from 'createjs-module';

@Injectable()
export class DrawService {

  constructor() { }

  getCornerTopLeft(instructions: Array<any>):XY{
    let minX = 999999;
    let minY = 999999;
    instructions.forEach((eachInstruction)=>{
      if(eachInstruction['x'] && eachInstruction['y']){
        let x = eachInstruction['x'];
        let y = eachInstruction['y'];
        console.log("y = ", y);
        if(x < minX){
          minX = x;
        }

        if(y < minY){
          minY = y;
        }
      }
    });
    let topLeft = new XY();
    topLeft.x = minX;
    topLeft.y = minY;
    return topLeft
  }

  getCornerTopRight(instructions: Array<any>):XY{
    let maxX = 0;
    let minY = 999999;
    instructions.forEach((eachInstruction)=>{
      if(eachInstruction['x'] && eachInstruction['y']){
        let x = eachInstruction['x'];
        let y = eachInstruction['y'];
        if(x > maxX){
          maxX = x;
        }

        if(y < minY){
          minY = y;
        }
      }
    });
    let topRight = new XY();
    topRight.x = maxX;
    topRight.y = minY;
    return topRight
  }

  calWidth(point1:XY, point2:XY): number{
    let a1 = Math.pow(point2.x-point1.x, 2);
    let a2 = Math.pow(point2.y-point1.y, 2);
    let width = Math.sqrt(a1 + a2);
    return width;
  }

  getHWXYrect(rect:Graphics):HWXY{
    console.log("rect = ", rect);
    let hwxy = new HWXY();
    hwxy.h = rect.command["h"];
    hwxy.w = rect.command["w"];
    hwxy.x = rect.command["x"];
    hwxy.y = rect.command["y"];
    return hwxy
  }
}



export class XY {
  x: number;
  y: number;
}

export class HWXY{
  h: number;
  w: number;
  x: number;
  y: number;
}