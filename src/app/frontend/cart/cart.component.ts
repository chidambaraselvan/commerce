import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/shared/product.service';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  height: string
  data: any[]
  displayedColumns: string[] = ['select', 'Item', 'Name', 'Count', 'Price', 'Actions'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  price:number[]

  constructor(private productService: ProductService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.height = (window.innerHeight - 64).toString() + 'px';
    this.productService.cartSubject.subscribe(() => {
      this.data = this.productService.cartData;
      this.dataSource.data = this.data;
      this.price = this.data.map(x=>x.Price);
      console.log(this.price);
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  calculation() {
    return this.price.reduce((summ, v) => summ += v, 0)
  }

  countIncrement(i: number) {
    let count = this.data[i].Count;
    count++;
    if (count < 11) {
      this.data[i].Count = count;
      this.price[i] = count*this.data[i].Price;
    }else{
      this.snackBar.open("Product count limit 10");
    }
  }

  countDecrement(i: number) {
    let count = this.data[i].Count;
    count--;
    if (count > 0) {
      this.data[i].Count = count;
      this.price[i] = count*this.data[i].Price;
    } else {
      this.snackBar.open("Product count should be greater than 1");
    }
  }

  countChange() {
    this.productService.changeCartSubjectData(this.data);
  }
}
