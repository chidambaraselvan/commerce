import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
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
  displayedColumns: string[] = ['select','Name', 'Price', 'Image', 'DateCreated'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

@ViewChild(MatPaginator) paginator: MatPaginator;

constructor(private product: ProductService,public dialog:MatDialog) { }

ngOnInit() {
  this.height = (window.innerHeight - 64).toString() + 'px';
  this.product.getProducts().subscribe(
    (data: any[]) => {
      console.log(data);
      this.dataSource.paginator = this.paginator
      this.dataSource.data = data
    }
  )
}

applyFilter(filterValue: string){
  this.dataSource.filter = filterValue.trim().toLowerCase();
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

dialogOpen(){
  const dialogRef = this.dialog.open(ProductdialogComponent,{
    data:{
      title:"Create Product"
    }
  })
  dialogRef.afterClosed().subscribe(result =>{
    console.log('Product Created'+ result);
  })
}

}
