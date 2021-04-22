import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Hotel } from '../models/hotel';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})

export class HotelsComponent implements OnInit {

  hotels: Hotel[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

    this.apollo
      .query<any>({
        query: gql`
          {
            getHotel {
                id,
                hotel_id,
                hotel_name,
                street,
                city,
                postal_code,
                price,
                email
            }
          }
        `
      })
      .subscribe(
        ({ data, loading }) => {
          console.log('data: ', data);
          this.hotels = data.getHotel;
          this.loading = loading;
        }
      );

  }

}
