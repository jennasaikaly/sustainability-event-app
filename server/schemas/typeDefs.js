const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        events: [Event]!
    }
    type Event {
        _id: ID
        eventTitle: String
        organizers: String
        username: String
        description: String
        keywords: String
        location: String
        eventTime: String
        eventDate: String
        eventFees: String
        contactInfo: String
        additionalInfo: String
        link: String
        image: String
        createdAt: String
        comments: [Comment]!
    }
    
    type Comment {
        _id: ID
        commentText: String
        username: String
        createdAt: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        events: [Event]!
        event(eventId: ID!): Event
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addEvent(args: String!): Event
        addComment(eventId: ID!, commentText: String!): Event
        removeEvent(eventId: ID!): Event
        removeComment(eventId: ID!, commentId: ID!): Event
    }
`;

module.exports = typeDefs;