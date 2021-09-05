import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { toursparams } from 'src/tour';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //
  //define the headers to manage requests
  headers = new HttpHeaders();
  //
  //define the server url
  private baseUrl = "http://timchistadventures.co.ke/backend/";
  //
  //Define the httpOptions for handling requests
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  //
  //Create a new instance of the HttpClient i.e injecting the imported HttpClient
  constructor(private httpClient: HttpClient) {};

  //
  //Return data by invoking the get method of the HttpClient using the baseUrl
  public getdestinations(){
    console.log("base", this.baseUrl);
    return this.httpClient.get
    (`${this.baseUrl}timadventures.php?class=timAdventures&method=destination`).pipe(
      map((res: any) => {
        return res;
      }));
  }
  //
  //Return destination attractions through the get method, 
  //baseUrl and incoming variable
  getAttractions(destination?: any ){
    return this.httpClient.get
    (`${this.baseUrl}timadventures.php?class=timAdventures&method=attractions&destination="${destination}"`).pipe(
      map((res: any) => {
        //console.log("Attractions: ", res);
        return res;
      }));
  }
  //
  //Returns services in a destination using the get method,
  //baseUrl and incoming attraction variable
  getServices(attraction?: any){
    //console.log("Data Service: ", attraction);
    return this.httpClient.get
    (`${this.baseUrl}timadventures.php?class=timAdventures&method=services&attraction="${attraction}"`).pipe(
      map((res: any) => {
        //console.log("servicesdata: ", res);
        return res;
      }));
  }
  //
  //
  getServiceDetails($attraction: string, $service: string, $type: string){
    console.log("Attraction:", $attraction, "services:", $service, "Type:", $type);
    return this.httpClient.get
    (`${this.baseUrl}timadventures.php?class=timAdventures&method=getServiceDetails&attraction="${$attraction}"&service=${$service}&type=${$type}`).pipe(
      map((res: any) => {
        return res;
        //console.log("servicesdata: ", res);
      }));
  }
}
//
//
export class PlanningService {
  //
  //define the plan to store the array of teh current plan
  public plans: toursparams[] = [];
  //
  //define the addServicemethod adds a service to the array of plans
  addService(tours: toursparams){
    this.plans.push(tours);
  }
  //
  //define the getplans method to get plans
  getService(){
    return this.plans;
  }
  //
  //define the clearplans method. clears the plan
  clearPlans(){
    this.plans=[];
    return this.plans;
  }
}
//

