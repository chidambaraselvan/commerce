import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.scss']
})
export class ProductdialogComponent implements OnInit {
  addProductForm: FormGroup
  success: boolean = false;
  error: string = "";
  image: string;
  public productSub = new BehaviorSubject(this.data.product.Image);
  currentProd = this.productSub.asObservable();

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, private product: ProductService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ProductdialogComponent>) { }

  ngOnInit() {
    console.log(this.data)
    this.currentProd.subscribe(() => {
      if (this.data.title == "Create Product") {
        this.addProductForm = this.fb.group({
          name: ['', [Validators.required, Validators.maxLength(128)]],
          price: ['', Validators.required],
          image: [null, Validators.required],
          desc: ['', [Validators.required, Validators.maxLength(1000)]],
        });
      } else {
        if (this.productSub.value == "") {
          this.addProductForm = this.fb.group({
            name: [this.data.product.Name, [Validators.required, Validators.maxLength(128)]],
            price: [this.data.product.Price, Validators.required],
            image: [null, Validators.required],
            desc: [this.data.product.Description, [Validators.required, Validators.maxLength(1000)]],
          });
        } else {
          this.addProductForm = this.fb.group({
            name: [this.data.product.Name, [Validators.required, Validators.maxLength(128)]],
            price: [this.data.product.Price, Validators.required],
            desc: [this.data.product.Description, [Validators.required, Validators.maxLength(1000)]],
          });
        }
      }
    })
  }

  upload(e: any) {
    const file = e.target.files[0]
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    }
    reader.readAsDataURL(file);

  }

  removeImage() {
    this.data.product.Image = ""
    this.productSub.next(this.data.product.Image)
  }

  onSubmit() {
    console.log(this.addProductForm.value);
    console.log(this.image);

    if (this.data.title == "Create Product") {
      let date: any = new Date();
      date = date.toLocaleString();
      this.product.addProduct(this.addProductForm.value, this.image, date).subscribe((data: any) => {

        if (data != "") {
          let snackBarRef = this.snackBar.open("Product Created Successfully");

          this.addProductForm.markAsPristine()
          this.addProductForm.markAsUntouched()
          this.formDirective.resetForm()
          this.addProductForm.reset()
          this.image = ""
          date = ""
          snackBarRef.afterDismissed().subscribe(() => {
            this.product.changeData(data)
          })
        }
      })
    } else {
      this.image = (this.image != undefined) ? this.image : this.data.product.Image
      this.product.putProduct(this.addProductForm.value, this.image, this.data.product.DateCreated, this.data.product.ProductId).subscribe((data: any) => {
        if (data != "") {
          let snackBarRef = this.snackBar.open("Product Updated Successfully");
          snackBarRef.afterDismissed().subscribe(() => {
            this.product.changeData(data)
          })
        }
      })
    }
  }

}
