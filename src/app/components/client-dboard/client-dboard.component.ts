import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanningService } from 'src/app/data.service';

@Component({
  selector: 'client-dboard',
  templateUrl: './client-dboard.component.html',
  styleUrls: ['./client-dboard.component.css']
})
export class ClientDboardComponent implements OnInit {
  //
  constructor(
      private activeroute: ActivatedRoute,
      private plans: PlanningService
    ){}

  ngOnInit(): void {
  }

}
