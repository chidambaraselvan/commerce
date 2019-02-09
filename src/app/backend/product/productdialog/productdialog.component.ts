import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.scss']
})
export class ProductdialogComponent implements OnInit {
  addProductForm: FormGroup
  success: boolean = false;
  error:string ="";
  image:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public fb:FormBuilder,private prouct:ProductService) { }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image:[null,Validators.required],
      desc:[''],
    });
  }

  upload(e:any){
    const file = e.target.files[0]
    let reader = new FileReader();
    reader.onload = (e:any) =>{
      this.image = e.target.result;
    }
    reader.readAsDataURL(file);
    
  }

  onSubmit(){
    console.log(this.addProductForm.value);
    console.log(this.image);
  }

}
