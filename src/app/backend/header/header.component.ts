import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  message: string = "toggle"
  show:boolean
  @Output() messageEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    const user= JSON.parse(sessionStorage.getItem("user"));
    this.show = user != null ? false: true
  }

  toggle(){
    this.messageEvent.emit(this.message)
  }
}
