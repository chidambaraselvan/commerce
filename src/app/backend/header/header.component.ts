import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user:any
  message: string = "toggle"
  name:string
  show:boolean
  @Output() messageEvent = new EventEmitter<string>();
  constructor(public data:DataService) { }

  ngOnInit() {
    this.data.currentData.subscribe(user=>{ 
      this.user = user;
      this.show = this.user != null ? true: false
      if(this.user != null){
        this.user =JSON.parse(this.user)
        this.name = this.user.Name.toLowerCase().charAt(0).toUpperCase() + this.user.Name.toLowerCase().substr(1);
      }
    })
  }

  toggle(){
    this.messageEvent.emit(this.message)
  }
}
