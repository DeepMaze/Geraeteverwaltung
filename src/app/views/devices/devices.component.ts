import { Component, OnInit } from '@angular/core';
import { Device } from '../../interfaces/device.interface';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  public devices: Array<Device> = [];

  constructor() { }

  ngOnInit(): void {
  }

}