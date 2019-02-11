import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/shared/product.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductdialogComponent } from './productdialog/productdialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  height: string
  data: any[]
  displayedColumns: string[] = ['select', 'Name', 'Price', 'Image', 'DateCreated', 'Actions'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private product: ProductService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.height = (window.innerHeight - 64).toString() + 'px';
    this.product.currentData.subscribe(() => {
      this.product.getProducts().subscribe(
        (data: any[]) => {
          this.data = data;
          this.dataSource.paginator = this.paginator
          this.dataSource.data = this.data
        }
      )
    })
  }

  applyFilter(filterValue: string) {
    if (filterValue != "") {
      this.dataSource.data = this.dataSource.data.filter(x =>
        x.Name.trim().toLowerCase().includes(filterValue.trim().toLowerCase()) || x.Price.toString().includes(filterValue.trim().toLowerCase())
      );
    } else {
      this.dataSource.data = this.data
    }
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

  dialogOpen() {
    const dialogRef = this.dialog.open(ProductdialogComponent, {
      data: {
        title: "Create Product",
        product: {
          ProductId: "",
          Name: "",
          Price: "",
          Image: "",
          Description: "",
          DateCreated: ""
        }
      }
    })
    dialogRef.afterClosed().subscribe(() => {
      console.log('Product Created');
    })
  }

  edit(singleProduct: any) {
    console.log(singleProduct);
    const dialogRef = this.dialog.open(ProductdialogComponent, {
      data: {
        title: "Update Product",
        product: singleProduct
      }
    })
    dialogRef.afterClosed().subscribe(() => {
      console.log('Product Created');
    })
  }

  delete(id: number) {
    this.product.deleteProduct(id).subscribe((data) => {
      console.log(data);
      let snackBarRef = this.snackBar.open("Product deleted Successfully");
      snackBarRef.afterDismissed().subscribe(() => {
        this.product.changeData(data)
      })
    })
  }
}
