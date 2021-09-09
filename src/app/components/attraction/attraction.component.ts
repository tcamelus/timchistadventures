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

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.params.subscribe((p) => {
      this.selectedRecordId = p['destination'];
      this.getAttractionDetails(this.selectedRecordId);
    });
  }

  ngOnInit(): void {
    this.getAttractionDetails(this.selectedRecordId);
  }

  getAttractionDetails(selectedRecordId: string) {
    this.isLoading = true;
    let destination = this.selectedRecordId;
    this.dataService
      .getAttractions(destination)
      .subscribe((data: toursparams[]) => {
        //
        this.attractions = data;
        this.isLoading = false;
      });
  }
  //Get attractions
  getServices(attraction: string) {
    this.router.navigate(['/services', attraction]);
  }
}
