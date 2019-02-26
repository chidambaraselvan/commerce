import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dashboardData:any
  height:string
  show:boolean
  constructor(public dashboard:DashboardService) {
    
   }

  ngOnInit() {
    this.dashboard.getdata().then((res)=>{
      this.dashboardData = res
      console.log(this.dashboardData)
    })
    this.height = (window.innerHeight - 64).toString()+'px';
  }

}
