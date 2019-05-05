import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../services/item.service';
import { ColorService } from '../../services/color.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-color-picker-dialog',
  templateUrl: './color-picker-dialog.component.html',
  styleUrls: ['./color-picker-dialog.component.css']
})
export class ColorPickerDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ColorPickerDialogComponent>,
    private itemService: ItemService, 
    private colorService: ColorService,
    private projectService: ProjectService  ) { }

  public dominantColors: string[] = [];
  public appropriateTypeColors: string[] = [];
  public inappropriateTypeColors: string[] = [];

  public color: string[] = [

  ];

  ngOnInit() {
    if (this.itemService.items.length > 0) {
      for (const imageModel of this.itemService.items) {
        const image = imageModel.image;
        var img = new Image();
        img.src = image;
        img.onload = (event) => {
          let color = this.getAverageRGB(event["path"][0]);
          const hexColor = this.rgbToHex(color.r, color.g, color.b);
          this.dominantColors.push(hexColor);
        };
      }
    }

    if (this.itemService.itemsText.length > 0) {
      for (const imageModel of this.itemService.itemsText) {
        const image = imageModel.image;
        var img = new Image();
        img.src = image;
        img.onload = (event) => {
          let color = this.getAverageRGB(event["path"][0]);
          const hexColor = this.rgbToHex(color.r, color.g, color.b);
          this.dominantColors.push(hexColor);
        };
      }
    }

    const colorByType = this.colorService.getColorByProductype(this.projectService.curCusProj.CUS_PROJ_TYPE);
    console.log("colorByType=", colorByType);
    this.appropriateTypeColors = colorByType.app;
    this.inappropriateTypeColors = colorByType.inapp;
  }

  changeColor(color) {
    console.log("changeColor color=", color);
    this.itemService.bgColor = color;
  }

  getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = { r: 0, g: 0, b: 0 },
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
        alert('x');
      return defaultRGB;
    }
    console.log("######### image data = ", data);
    length = data.data.length;
    

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }
    
    console.log("rgb = ", rgb);
    console.log("count = ", count);
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }




}
