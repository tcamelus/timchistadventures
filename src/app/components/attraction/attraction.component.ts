import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { toursparams } from 'src/tour';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.css'],
})
export class AttractionComponent implements OnInit {
  //
  //get the selected record pk
  selectedRecordId!: string;
  //
  //define the attraction array
  attractions: toursparams[] = [];
  isLoading: boolean = true;
  destID: any;
  destName: any;
  destSelected: any;
  isShowing: boolean = false;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.activeRoute.params.subscribe((p) => {
    //   this.selectedRecordId = p['destination'];
    //   this.getAttractionDetails(this.selectedRecordId);
    // });
  }

  ngOnInit(): void {
    this.destSelected = sessionStorage.getItem('selectedDestination');

    let destinationId = JSON.parse(this.destSelected);

    this.destID = destinationId.destination;
    this.destName = destinationId.name;
    this.getAttractionDetails(this.destID);
  }

  getAttractionDetails(destID: string) {
    this.isLoading = true;
    let destination = this.destID;
    this.dataService
      .getAttractions(destination)
      .subscribe((data: toursparams[]) => {
        //
        this.attractions = data;
        this.isLoading = false;
      });
  }
  //Get attractions
  getServices(attraction: string, name: string) {
    this.isShowing = true;
    let selectedAttraction = { attraction, name };

    sessionStorage.setItem(
      'selectedAttraction',
      JSON.stringify(selectedAttraction)
    );

    this.router.navigate(['/services', selectedAttraction.attraction]);
  }
}
