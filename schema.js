const { gql } = require('apollo-server');

// Définition du schéma GraphQL
const typeDefs = gql`
  type Room {
    id: ID!
    name: String!
    description: String!
    amenities: [String!]!
  }

  type Reservation {
    id: ID!
    roomId: ID!
    guestName: String!
    checkInDate: String!
    checkOutDate: String!
  }

  type Query {
    rooms: [Room!]!
    room(id: ID!): Room
    reservations: [Reservation!]!
    reservation(id: ID!): Reservation
  }

  type Mutation {
    reserveRoom(roomId: ID!, guestName: String!, checkInDate: String!, checkOutDate: String!): Reservation!
    cancelReservation(id: ID!): Boolean
  }
`;

module.exports = typeDefs;