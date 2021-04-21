const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
   scalar Date

   type BookHotel {
     id: ID!
     hotel_id: Int!
     booking_date: String!
     booking_start: String!
     booking_end: String!
     user_id: Int!
   }

   type Hotel {
     id: ID!
     hotel_id: Int!
     hotel_name: String!
     street: String!
     city: String!
     postal_code: String!
     price: Float!
     email: String!
     user_id: Int!
   }
   
   type User {
     id: ID!
     user_id: Int!
     username: String!
     password: String!
     email: String!
   }

   type Query {
     getBookHotel: [BookHotel]
     getBookHotelByID(id: ID!): BookHotel
     getHotel: [Hotel]
     getHotelByID(id: ID!): Hotel
     getHotelByName(hotel_name: String!): [Hotel]
     getHotelByCity(city: String!): [Hotel]
     getUser: [User]
     getUserByID(id: ID!): User
   }

   type Mutation {
      addBookHotel(hotel_id: Int!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        user_id: Int!): BookHotel

     updateBookHotel(id: String!,
        hotel_id: Int!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        user_id: Int!): BookHotel

     deleteBookHotel(id: ID!): BookHotel
   
     addHotel(hotel_id: Int!
        hotel_name: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        user_id: Int!): Hotel

     updateHotel(id: String!,
        hotel_id: Int!
        hotel_name: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        user_id: Int!): Hotel

     deleteHotel(id: ID!): Hotel
     
     addUser(user_id: Int!
        username: String!
        password: String!
        email: String!): User

     updateUser(id: String!,
        user_id: Int!
        username: String!
        password: String!
        email: String!): User

     deleteUser(id: ID!): User
   }
`
