import { Component, OnInit } from '@angular/core';
import { PlanningService } from 'src/app/data.service';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrls: ['./planned.component.css'],
})
export class PlannedComponent implements OnInit {
  //
  //Date picker variables
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  //
  //get the plans and store in the plandetails.
  planDetails = this.plans.getService();
  //
  //declare the booked services for data processing
  bkservices: any[] = [];
  //
  //
  service: any;
  //
  //
  plannedServices: any = [];

  constructor(
    private plans: PlanningService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.processData();
  }
  //process incoming data and group based on destination and attraction
  private processData() {
    const destinationsSeen: Record<any, any> = {};
    const attractionsSeen: Record<any, any> = {};

    this.bkservices = this.planDetails
      .sort((a, b) => {
        const destinationComp = a.destination.localeCompare(b.destination);
        return destinationComp
          ? destinationComp
          : a.attraction.localeCompare(b.attraction);
      })
      .map((x) => {
        const destinationSpan = destinationsSeen[x.destination]
          ? 0
          : this.planDetails.filter((y) => y.destination === x.destination)
              .length;

        destinationsSeen[x.destination] = true;

        const attractionSpan =
          attractionsSeen[x.destination] &&
          attractionsSeen[x.destination][x.attraction]
            ? 0
            : this.planDetails.filter(
                (y) =>
                  y.destination === x.destination &&
                  y.attraction === x.attraction
              ).length;

        attractionsSeen[x.destination] = attractionsSeen[x.destination] || {};
        attractionsSeen[x.destination][x.attraction] = true;

        return { ...x, destinationSpan, attractionSpan };
      });
  }
  //
  //delete a service from the plan
  deleteRow(service: any) {
    alert('Deleting');
    const index = this.bkservices.indexOf(service);
    this.bkservices.splice(index, 1);
  }
  //
  bookTrip(evt: Event) {
    const el = <HTMLButtonElement>evt.target;
    if (el === null) {
      throw new Error('element not found');
    }
    //
    //Get the tr parent
    const tr = <HTMLTableRowElement>el.parentElement?.parentElement;
    //
    //Get the info you are looking for
    const date = tr.cells[0].textContent;
    //
    //Get the tr above
    const tr_above = <HTMLTableRowElement>(
      (<HTMLTableSectionElement>tr.parentElement!).rows[tr.rowIndex - 1]
    );
    //this.plannedServices = this.bkservices.push(this.fromDate, this.toDate);
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
