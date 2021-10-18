import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { toursparams } from 'src/tour';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css'],
})
//
export class DestinationsComponent implements OnInit {
  //
  //define the destinations variable
  destinations: toursparams[] = [];
  isLoading: boolean = true;
  isShowing: boolean = false;
  attractionsContent: any;
  //
  //create a new instance of dataservice from the imported data.service
  constructor(private dataService: DataService, private router: Router) {}
  //
  ngOnInit() {
    //
    //Call the getdestinations method of the service
    this.getDestinations();
  }
  getDestinations(): void {
    this.isLoading = true;
    //
    this.dataService.getdestinations().subscribe((data: toursparams[]) => {
      //
      this.destinations = data;
      this.isLoading = false;
    });
  }
  //
  //Get attractions
  getAtrractions(destination: string, name: string) {
    this.isShowing = true;

    let selected = { destination, name };

    sessionStorage.setItem('selectedDestination', JSON.stringify(selected));
  }
}
