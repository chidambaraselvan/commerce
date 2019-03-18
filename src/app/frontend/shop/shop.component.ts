import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any
  cartProducts: any[]

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.cartSubject.subscribe(() => {
      this.productService.getProducts().toPromise().then((res) => {
        this.cartProducts = this.productService.cartData.map((item) => item.ProductId);
        this.products = res
        console.log(this.products);
        console.log(this.cartProducts);
      })
    })
  }

  addToCart(product: Product) {
    this.productService.cartData.push(product);
    this.productService.changeCartSubjectData(this.productService.cartData);
  }

  removeFromCart(product: Product) {
    const index = this.productService.cartData.findIndex((x)=>x.ProductId == product.ProductId)
    this.productService.cartData.splice(index,1);
    this.productService.changeCartSubjectData(this.productService.cartData);
  }
}
