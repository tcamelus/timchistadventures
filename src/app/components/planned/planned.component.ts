import { Component, OnInit } from '@angular/core';
import { PlanningService } from 'src/app/data.service';

@Component({
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrls: ['./planned.component.css']
})
export class PlannedComponent implements OnInit {
  //
  //get the plans and store in the plandetails.
  planDetails=this.plans.getService();
  //
  //declare the booked services for data processing
  bkservices: any[]=[];
  //
  //
  service: any;


  constructor(private plans: PlanningService) {
    
   }

  ngOnInit(): void {
    this.processData();
  }
  //process incoming data and group based on destination and attraction
  private processData() {
    console.log(this.planDetails);
    const destinationsSeen: Record<any, any> = {};
    const attractionsSeen: Record<any, any> = {};

    this.bkservices = this.planDetails.sort((a, b) => {
      const destinationComp = a.destination.localeCompare(b.destination);
      return destinationComp ? destinationComp : a.attraction.localeCompare(b.attraction);
    }).map(x => {
      const destinationSpan = destinationsSeen[x.destination] ? 0 :
        this.planDetails.filter(y => y.destination === x.destination).length;

      destinationsSeen[x.destination] = true;

      const attractionSpan = attractionsSeen[x.destination] && attractionsSeen[x.destination][x.attraction] ? 0 :
        this.planDetails.filter(y => y.destination === x.destination && y.attraction === x.attraction).length;

        attractionsSeen[x.destination] = attractionsSeen[x.destination] || {};
        attractionsSeen[x.destination][x.attraction] = true;

      return { ...x, destinationSpan, attractionSpan };
    });
  }
  //
  //delete a service from the plan
  deleteRow(service: any){
    alert("Deleting");
    console.log(service);
    const index = this.bkservices.indexOf(service);
    this.bkservices.splice(index, 1);
}
}