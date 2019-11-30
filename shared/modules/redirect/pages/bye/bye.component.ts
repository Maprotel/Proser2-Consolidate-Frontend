import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'redirect-bye',
  templateUrl: './bye.component.html',
  styleUrls: ['./bye.component.scss']
})
export class ByeComponent implements OnInit {

  visibleMenus;
  currentUser;
  showInMenu;

  constructor() {
    this.visibleMenus = {
      loginMenu: true,
      sectionsMenus: false,
      userMenu: false
    }

    this.currentUser = null;
  }

  ngOnInit() {
  }

}
