import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Hotel } from '../models/hotel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})

export class HotelsComponent implements OnInit {
  hotels: Hotel[];
  hotel_id = '';
  selectedHotelName = '';
  selectedHotelCity = '';
  loading = true;
  error: any;

  constructor(private router: Router, private apollo: Apollo) { }

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
                postal_code,
                price,
                email
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
                postal_code,
                price,
                email
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

  addBooking(): void{
    this.apollo.query<any>({
      query: gql`
        query ($hotel_id: String!){
          getHotelByHotelID(hotel_id:$hotel_id){
                id,
                hotel_id,
                hotel_name,
                street,
                city,
                postal_code,
                price,
                email
          }
        }`,
      variables: {
        hotel_id: this.hotel_id,
      }
    })
      .subscribe(({data, loading}) => {
          this.hotels = data.getHotelByHotelID;
          this.loading = loading;
          this.router.navigate(['/bookings']);
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }
}
