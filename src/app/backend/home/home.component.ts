import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  show:boolean
  constructor() {
    
   }

  ngOnInit() {
    const user= JSON.parse(sessionStorage.getItem("user"));
    this.show = user != null ? false: true
  }

}
