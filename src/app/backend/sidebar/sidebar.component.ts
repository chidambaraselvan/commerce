import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sidenavAnimationIsExpanded', [
      state('true', style({
        width: '200px'
      })),
      state('false', style({
        width: '64px'
      })),
      transition('false <=> true', animate('100ms ease'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  show:boolean
  @ViewChild(MatSidenav) sidenav: MatSidenav

  constructor() { }

  ngOnInit() {
    const user= JSON.parse(sessionStorage.getItem("user"));
    this.show = user != null ? false: true
  }
  message: any;
  isExpanded = true;
  animating = false;

  start() {
    this.animating = true;
    this.tick();
  }

  done() {
    this.animating = false;
  }

  tick() {
    if (this.animating) requestAnimationFrame(() => this.tick());
  }

  receiveMessage($event: any) {
    this.message = $event
    this.sidenav.toggle();
  }
}
