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

  cartData:any[] = []
  cartSubject = new BehaviorSubject(this.cartData);
  currentCartSubject = this.cartSubject.asObservable();

  constructor(public http:HttpClient) { }

  changeData(data:any){
    this.productData.next(data)
  }

  changeCartSubjectData(data:any){
    this.cartSubject.next(data);
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
}
