import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any
  cartProducts: any[]
  wishListProducts:any[]

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().toPromise().then((res) => {
      this.products = res
    })
    this.productService.cartSubject.subscribe(() => {
      this.cartProducts = this.productService.cartData.map((item) => item.ProductId);
    })
    this.productService.wishListSubject.subscribe(() => {
        this.wishListProducts = this.productService.wishListData.map((item) => item.ProductId);
    })
  }

}
