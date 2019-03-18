import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products:any

  constructor(public productService:ProductService) { }

  ngOnInit() {
    this.productService.getProducts().toPromise().then((res)=>{
      this.products=res
      console.log(this.products);
    })
  }

}
