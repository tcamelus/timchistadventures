import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { toursparams } from 'src/tour';


@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
// 
export class DestinationsComponent implements OnInit {
  //
  //define the destinations variable
  destinations: toursparams[]=[];
  //
  //create a new instance of dataservice from the imported data.service
  constructor(private dataService: DataService, private router: Router) {
      
   }
   //
  ngOnInit() {
    //
    //Call the getdestinations method of the service
    this.getDestinations();
  }
  getDestinations(): void{
    //
    this.dataService.getdestinations().subscribe((data: toursparams[])=>{
      // 
      this.destinations=(data)
    });
  }
  //
  //Get attractions
  getAtrractions(destination: string) {
    this.router.navigate(['/attraction', destination]);
  }
}
