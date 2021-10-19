import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, PlanningService } from 'src/app/data.service';
import { toursparams } from 'src/tour';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  //
  //
  //get the selected record pk
  selectedAttraction!: string;
  //
  //set the selected ID
  serviceID!: string;
  //
  //
  type!: string;
  //
  data: any[] = [];
  //define the attraction array
  services: toursparams[] = [];
  isLoading: boolean = true;
  //
  //define the actual service in an attraction
  atservices: toursparams[] = [];
  attName: any;
  attID: any;
  attSelected: any;
  selectedService: any;
  isSelected: boolean = false;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private plans: PlanningService
  ) {
    // this.activeRoute.params.subscribe((p) => {
    //   this.selectedAttraction = p['attraction'];
    //   this.getServices(this.selectedAttraction);
    //   this.serviceID = p['service'];
    //   this.type = p['type'];
    //   this.getServiceDetails(this.serviceID, this.type);
    // });
  }

  ngOnInit(): void {
    this.attSelected = sessionStorage.getItem('selectedDestination');

    let destinationId = JSON.parse(this.attSelected);

    this.attID = destinationId.destination;
    this.attName = destinationId.name;

    this.getServices(this.attID);
    // this.getServiceDetails(this.serviceID, this.type);
  }
  //
  //get the services from incoming data
  getServices(attID: string) {
    this.isLoading = true;
    let attraction = this.attID;
    this.dataService
      .getServices(attraction)
      .subscribe((data: toursparams[]) => {
        //
        this.services = data;

        console.log('services offered', this.services);
        this.isLoading = false;
      });
  }
  getServiceDetails($serviceID: string, $type: string) {
    this.isSelected = true;
    //

    this.dataService
      .getServiceDetails(this.attID, $serviceID, $type)
      .subscribe((data: toursparams[]) => {
        //
        this.selectedService = $type;
        this.atservices = data;
      });
  }
  //
  //Add services to the plans
  addService(atservices: toursparams) {
    //get the attraction and service
    this.plans.addService(atservices);
    window.alert('service added to plans!');
  }
}
