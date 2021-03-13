import { Component, OnInit } from '@angular/core';
import { Location } from "../../interfaces/location.interface";

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
      this.locations.push({ name: `Name_${index}`, address: { street: `Straße_${index}`, city: `Stadt_${index}`} })
    }
  }

  doFilter(): void {

  }

}
