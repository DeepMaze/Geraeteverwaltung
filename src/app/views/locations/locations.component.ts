import { Component, OnInit } from '@angular/core';
import { Location } from "../../interfaces/location.interface";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  public locations: Array<Location> = [];

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.locations.push({ name: `Name_${index}`, address: { street: `Straße_${index}`, city: `Stadt_${index}` } })
    }
  }

  doFilter(): void { }

  cancel(index: number) { }

  deleteDevice(index: number): void { }

  saveDevice(index: number): void { }

}
