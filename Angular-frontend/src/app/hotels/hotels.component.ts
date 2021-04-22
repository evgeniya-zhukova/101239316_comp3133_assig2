import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Hotel } from '../models/hotel';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})

export class HotelsComponent implements OnInit {
  hotels: Hotel[];
  selectedHotelName = '';
  selectedHotelCity = '';
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
          this.hotels = data.getHotel;
          this.loading = loading;
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }

  searchByName(): void{
    this.apollo.query<any>({
      query: gql`
        query ($hotel_name:String!){
          getHotelByName(hotel_name:$hotel_name){
            id,
            hotel_id,
            hotel_name,
            street,
            city,
            price
          }
        }`,
      variables: {
        hotel_name: this.selectedHotelName
      }
    })
      .subscribe(({data, loading}) => {
          this.hotels = data.getHotelByName;
          this.loading = loading;
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }

  searchByCity(): void{
    this.apollo.query<any>({
      query: gql`
        query ($city:String!){
          getHotelByCity(city:$city){
            id,
            hotel_id,
            hotel_name,
            street,
            city,
            price
          }
        }`,
      variables: {
        city: this.selectedHotelCity
      }
    })
      .subscribe(({data, loading}) => {
          this.hotels = data.getHotelByCity;
          this.loading = loading;
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }
}
