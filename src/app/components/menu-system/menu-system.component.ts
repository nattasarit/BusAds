import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuModel } from '../../model/menu.model';

@Component({
  selector: 'app-menu-system',
  templateUrl: './menu-system.component.html',
  styleUrls: ['./menu-system.component.css']
})
export class MenuSystemComponent implements OnInit {

  constructor() { }
  menus = [];

  @Output()
  menuSystemIsClicked: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    const menuResponse = [
      {
        name: 'design',
        displayName: 'ออกแบบ',
        icon: 'fas fa-file-upload'
      },
      {
        name: 'add-template',
        displayName: 'เพิ่มแม่แบบ',
        icon: 'fas fa-bus'
      },
      {
        name: 'logout',
        displayName: 'ออกจากระบบ',
        icon: 'fas fa-sign-out-alt'
      }
    ];

    menuResponse.forEach(menuRes => {
      const menu = new MenuModel();
      menu.name = menuRes['name'];
      menu.displayName = menuRes['displayName'];
      menu.icon = menuRes['icon'];
      this.menus.push(menu);
    });
  }

  onCLickMenuSystem(response) {
    this.menuSystemIsClicked.emit(response);
  }

}
