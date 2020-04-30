import { Component, OnInit, Input } from '@angular/core';
import { FlavourEditComponent } from '../flavour-edit/flavour-edit.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Flavour } from '../../models/flavour';
import { FlavourService } from '../../services/flavour.service';

@Component({
  selector: 'app-flavour-list',
  templateUrl: './flavour-list.component.html',
  styleUrls: ['./flavour-list.component.css']
})
export class FlavourListComponent implements OnInit {
  isPopupOpened = true;
  displayedColumns = ['id', 'name', 'code', 'actionsColumn'];
  public flavours: Array<Flavour> = [];
  public dataSource = new MatTableDataSource(this.flavours);

  constructor(private flavourService: FlavourService, private dialog?: MatDialog) { }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.flavourService.getAll()
      .subscribe((resultData: Array<Flavour>) => {
        this.flavours = resultData;
        this.dataSource = new MatTableDataSource(this.flavours);
      });
  }
  editproduct(flavour : Flavour) {
    //this.router.navigate(['/product-list',product._id]);
    this.isPopupOpened = true;
 
    const dialogRef = this.dialog.open(FlavourEditComponent, {
    
      data: flavour

    });
 

    dialogRef.afterClosed().subscribe(flavour => {
      this.isPopupOpened = false;
    });

  }

}