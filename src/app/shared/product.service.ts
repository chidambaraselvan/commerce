import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http:HttpClient) { }

  getProducts(){
   return this.http.get('http://localhost:52253/api/Product')
  }

  addProduct(values:any){
    const data:Product ={
      ProductId:0,
      Name: values.name,
      Price:values.price,
      Image:values.image,
      Description:values.desc,
      DateCreated:values.date
    }
    return this.http.post('http://localhost:52253/api/Product',data)
  }
}
