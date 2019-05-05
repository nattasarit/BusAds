import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ColorService {
  private red: string[] = ["#b30000", "#cc0000", "#e60000", "#ff0000", "#ff1a1a", "#ff3333", "#ff4d4d"];
  private blue: string[] = ["#0000b3", "#0000cc", "#0000e6", "#0000ff", "#1a1aff", "#3333ff", "#4d4dff"];
  private green: string[] = ["#1c8412", "#219a15", "#25b118", "#2ac71b", "#2fdd1e", "#41e332", "#56e648"];
  private yellow: string[] = ["#c6be11", "#ddd513", "#ece31d", "#eee635", "#f0e94d", "#f2ec64", "#f4ef7c"];
  private purple: string[] = ["#7c198f", "#8e1ca5", "#a120ba", "#b424d0", "#c032dc", "#c748df", "#cd5de3"];
  private orange: string[] = ["#ff8f03", "#ff9a1d", "#ffa637", "#ffb150", "#ffbc6a", "#ffc883", "#ffd39d"];
  private brown: string[] = ["#683a01", "#814801", "#9b5601", "#b46401", "#cd7201", "#e78001", "#fe8e04"];
  private black: string[] = ["#000000", "#0c0c0c", "#191919", "#262626"];
  private white: string[] = ["#d8d8d8", "#e5e5e5", "#f2f2f2", "#ffffff"];

  public energyApp = [];
  public energyInApp = [];

  constructor() { }

  dynamicPush(dest, values) {
    for (const arrayColor of values) {
      for (const color of arrayColor) {
        // console.log("dynamicPush dest=", dest);
        // console.log("dynamicPush color=", color);
        dest.push(color);
      }
    }
  }

  getColorByProductype(productype: string) {
    const colors = {
      app: [],
      inapp: []
    }
    //1	Agriculture
    //2	Food
    //3	Energy
    //4	Finance
    //5	Airline
    //6	Household
    //7	Technology
    //8	Healthcare
    //9	Clothing
    //10	Car

    if (productype == "1") {
      this.dynamicPush(colors.app, [this.red, this.blue, this.brown]);
      this.dynamicPush(colors.inapp, [this.purple]);
    }
    else if (productype == "2") {
      this.dynamicPush(colors.app, [this.red, this.green, this.yellow]);
      this.dynamicPush(colors.inapp, [this.blue, this.black, this.white]);
    }
    else if (productype == "3") {
      this.dynamicPush(colors.app, [this.blue, this.green, this.yellow]);
      this.dynamicPush(colors.inapp, [this.red, this.purple, this.orange, this.black]);
    }
    else if (productype == "4") {
      this.dynamicPush(colors.app, [this.purple, this.blue, this.blue]);
      this.dynamicPush(colors.inapp, [this.red, this.yellow, this.orange, this.brown, this.black, this.white]);
    }
    else if (productype == "5") {
      this.dynamicPush(colors.app, [this.blue]);
      this.dynamicPush(colors.inapp, [this.red, this.green, this.yellow, this.orange, this.brown, this.black]);
    }
    else if (productype == "6") {
      this.dynamicPush(colors.app, [this.green, this.yellow]);
      this.dynamicPush(colors.inapp, []);
    }
    else if (productype == "7") {
      this.dynamicPush(colors.app, [this.red, this.purple, this.blue, this.orange, this.black]);
      this.dynamicPush(colors.inapp, [this.yellow, this.brown]);
    }
    else if (productype == "8") {
      this.dynamicPush(colors.app, [this.purple, this.blue, this.orange]);
      this.dynamicPush(colors.inapp, [this.black]);
    }
    else if (productype == "9") {
      this.dynamicPush(colors.app, [this.brown, this.black, this.white]);
      this.dynamicPush(colors.inapp, [this.red, this.blue, this.green, this.yellow, this.orange]);
    }
    else if (productype == "10") {
      this.dynamicPush(colors.app, [this.red, this.brown, this.black, this.white]);
      this.dynamicPush(colors.inapp, [this.red, this.green, this.yellow, this.orange]);
    }


    return colors;
  }

}
