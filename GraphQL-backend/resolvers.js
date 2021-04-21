const BookHotel = require('./models/BookHotel');
const Hotel = require('./models/Hotel');
const User = require('./models/User');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

exports.resolvers = {
    /*Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),*/
    Query: {
        getBookHotel: async (parent, args) => {
            return await BookHotel.find({});
        },
        getBookHotelByID: async (parent, args) => {
            return await BookHotel.findById(args.id);
        },
        getHotel: async (parent, args) => {
            return await Hotel.find({});
        },
        getHotelByID: async (parent, args) => {
            return await Hotel.findById(args.id);
        },
        getHotelByName: async (parent, args) => {
            return await Hotel.find({"hotel_name" : args.hotel_name});
        },
        getHotelByCity: async (parent, args) => {
            return await Hotel.find({"city" : args.city});
        },
        getUser: async (parent, args) => {
            return await User.find({});
        },
        getUserByID: async (parent, args) => {
            return await User.findById(args.id);
        },
    },
    Mutation: {
        addBookHotel: async (parent, args) => {
            console.log(args)

            let newBookHotel = new BookHotel({
                hotel_id: args.hotel_id,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                user_id: args.user_id,
            });
            return await newBookHotel.save();
        },
        updateBookHotel: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
            return await BookHotel.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        hotel_id: args.hotel_id,
                        booking_date: args.booking_date,
                        booking_start: args.booking_start,
                        booking_end: args.booking_end,
                        user_id: args.user_id
                    }
                }, {new: true}, (err, bookhotel) => {
                    if (err)
                    {
                        console.log('Something went wrong when updating the booking of hotel');
                    } else
                    {
                        return bookhotel
                    }
                }
            );
        },
        deleteBookHotel: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return JSON.stringify({status: false, "message" : "No ID found"});
            }
            return await BookHotel.findByIdAndDelete(args.id)
        },
        addHotel: async (parent, args) => {
            console.log(args)
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            //const isValidEmail =  emailExpression.test(String(email).toLowerCase())

            //if(!isValidEmail){
              //  throw new Error("email not in proper format")
            //}

            let newHotel = new Hotel({
                hotel_id: args.hotel_id,
                hotel_name: args.hotel_name,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
                user_id: args.user_id,
        });
        return await newHotel.save();
      },
        updateHotel: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
            return await Hotel.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    hotel_id: args.hotel_id,
                    hotel_name: args.hotel_name,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    user_id: args.user_id
                }
            }, {new: true}, (err, hotel) => {
                if (err)
                {
                    console.log('Something went wrong when updating the hotel');
                } else
                {
                    return hotel
                }
            }
        );
      },
        deleteHotel: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await Hotel.findByIdAndDelete(args.id)
      },
        addUser: async (parent, args) => {
            console.log(args)
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            //const isValidEmail =  emailExpression.test(String(email).toLowerCase())

            //if(!isValidEmail){
            //  throw new Error("email not in proper format")
            //}

            let newUser = new User({
                user_id: args.user_id,
                username: args.username,
                password: args.password,
                email: args.email,
            });
            return await newUser.save();
        },
        updateUser: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
            return await User.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        user_id: args.user_id,
                        username: args.username,
                        password: args.password,
                        email: args.email
                    }
                }, {new: true}, (err, user) => {
                    if (err)
                    {
                        console.log('Something went wrong when updating the user');
                    } else
                    {
                        return user
                    }
                }
            );
        },
        deleteUser: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return JSON.stringify({status: false, "message" : "No ID found"});
            }
            return await User.findByIdAndDelete(args.id)
        },
    }
  }
