import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSidenav } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';

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
  user: any
  show: boolean
  @ViewChild(MatSidenav) sidenav: MatSidenav

  constructor(public data: DataService, public router: Router) {
    this.data.currentData.subscribe(user =>{ 
      this.user = user
      console.log(this.user);
      this.show = (this.user != null) ? true : false
    })
  }

  ngOnInit() {

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

  logout() {
    sessionStorage.removeItem("user");
    this.data.changeData(sessionStorage.getItem("user"))
    this.router.navigate(['/login']);
  }
}
