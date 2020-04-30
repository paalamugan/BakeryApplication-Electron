import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatSnackBar } from '@angular/material';
import { Flavour } from '../../models/flavour';
import { FlavourService } from '../../services/flavour.service';

@Component({
  selector: 'app-flavour-add',
  templateUrl: './flavour-add.component.html',
  styleUrls: ['./flavour-add.component.css']
})
export class FlavourAddComponent implements OnInit {
  @ViewChild('flavourNameInput') flavourname: MatInput;
  public flavour: Flavour
  = new Flavour(1,"","");
  constructor(private flavourService: FlavourService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.flavourname.focus();
  }
  onSubmit(){
    this.flavourService.addFlavour(this.flavour)
    .subscribe((response) => {
      this.snackBar.open("Added Flavour Successfully", "Ok", {
        duration: 2000,
      });
    }
    );
  this.flavour.name ="";
  this.flavour.code ="";
  this.flavourname.focus();
  }
}
