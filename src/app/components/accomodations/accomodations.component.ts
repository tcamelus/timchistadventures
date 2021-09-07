import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrls: ['./accomodations.component.css']
})
export class AccomodationsComponent implements OnInit {
    //Array of data to be displayed on the cards
    cards = [
      {
        title: 'Card Title 1',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
      },
      {
        title: 'Card Title 2',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
      },
      {
        title: 'Card Title 3',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
      },
      {
        title: 'Card Title 4',
        description: 'Some quick example text to build on the card title and make up the bulk of the card content',
        buttonText: 'Button',
        img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
      },
  
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
