import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { MenuModel } from '../../model/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor() { }
  menus = [];

  @Output()
  menuIsClicked: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    const menuResponse = [
      {
        name: 'upload',
        icon: 'fas fa-file-upload'
      },
      {
        name: 'canvas',
        icon: 'fas fa-drafting-compass'
      }
    ];

    menuResponse.forEach(menuRes => {
      const menu = new MenuModel();
      menu.name = menuRes['name'];
      menu.icon = menuRes['icon'];
      this.menus.push(menu);
    });

    console.log('menus=', this.menus);
  }

  onCLickMenu(response) {
    this.menuIsClicked.emit(response);
  }

}
