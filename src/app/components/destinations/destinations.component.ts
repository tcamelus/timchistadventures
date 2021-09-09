import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
  isLoading: boolean = true;
  //
  //create a new instance of dataservice from the imported data.service
  constructor(private dataService: DataService, private router: Router, private breakpointObserver: BreakpointObserver) {
      
   }
   //
  ngOnInit() {
    //
    //Call the getdestinations method of the service
    this.getDestinations();
  }
  getDestinations(): void{
    this.isLoading = true;
    //
    this.dataService.getdestinations().subscribe((data: toursparams[])=>{
      // 
      this.destinations=(data);
      this.isLoading = false;
      console.log("Destinations: ",this.destinations);
    });
  }
  //
  //Get attractions
  getAtrractions(destination: string) {
    this.router.navigate(['/attraction', destination]);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
}
