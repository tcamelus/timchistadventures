import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { toursparams } from 'src/tour';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.css']
})
export class AdventuresComponent implements OnInit {
  //
  //get the selected record pk
  selectedRecordId!: string;
  //
  //define the attraction array
  attractions: toursparams[]=[];


  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute
  ) 
  {
    this.activeRoute.params.subscribe((p) => {
      this.selectedRecordId = p['destination'];
      this.getServiceDetails(this.selectedRecordId);
    });
  }

  ngOnInit(): void {
    this.getServiceDetails(this.selectedRecordId);
  }

  getServiceDetails(selectedRecordId: string){
    let selectedAttraction = this.selectedRecordId;
    console.log("Attractions: ", selectedAttraction);
    }

  }



