import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from './product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productData = new BehaviorSubject(this.getProducts());
  currentData = this.productData.asObservable();

  cartData:any[] = JSON.parse(sessionStorage.getItem('cart'))!= null?JSON.parse(sessionStorage.getItem('cart')) : [];
  cartSubject = new BehaviorSubject(this.cartData);
  currentCartSubject = this.cartSubject.asObservable();

  wishListData:any[] = JSON.parse(sessionStorage.getItem('wishlist'))!= null?JSON.parse(sessionStorage.getItem('wishlist')) : [];
  wishListSubject = new BehaviorSubject(this.wishListData);
  currentwishListSubject = this.wishListSubject.asObservable();

  constructor(public http:HttpClient) { }

  changeData(data:any){
    this.productData.next(data)
  }

  changeCartSubjectData(data:any){
    sessionStorage.setItem('cart',JSON.stringify(data))
    this.cartSubject.next(data);
  }

  changewishListSubjectData(data:any){
    sessionStorage.setItem('wishlist',JSON.stringify(data))
    this.wishListSubject.next(data);
  }

  getProducts(){
   return this.http.get('http://localhost:52253/api/Product')
  }

  addProduct(values:any,image:string,date:string){
    const data:Product ={
      ProductId:0,
      Name: values.name,
      Price:values.price,
      Image:image,
      Description:values.desc,
      DateCreated:date
    }
    return this.http.post('http://localhost:52253/api/Product',data)
  }

  putProduct(values:any,image:string,date:string,id:number){
    const data:Product ={
      ProductId:id,
      Name: values.name,
      Price:values.price,
      Image:image,
      Description:values.desc,
      DateCreated:date
    }
    return this.http.put('http://localhost:52253/api/Product/'+id,data)
  }

  deleteProduct(id:number){
    return this.http.delete('http://localhost:52253/api/Product/'+id)
  }

  addToCart(product: any) {
    product.Count = 1;
    this.cartData.push(product);
    this.changeCartSubjectData(this.cartData);
  }

  removeFromCart(product: any) {
    const index = this.cartData.findIndex((x)=>x.ProductId == product.ProductId)
    this.cartData.splice(index,1);
    this.changeCartSubjectData(this.cartData);
  }

  
  addToWishList(product: any) {
    product.Count = 1;
    this.wishListData.push(product);
    this.changewishListSubjectData(this.wishListData);
  }

  removeFromWishList(product: any) {
    const index = this.wishListData.findIndex((x)=>x.ProductId == product.ProductId)
    this.wishListData.splice(index,1);
    this.changewishListSubjectData(this.wishListData);
  }
}
