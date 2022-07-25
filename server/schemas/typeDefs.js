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
        eventTiming: String
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
        commentAuthor: String
        createdAt: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        events: [Event]
    }

    type Query {
        events: [Event]!
        event(eventId: ID!): Event
    }
    
    type Mutation {
        addEvent(args: String!): Event
        addComment(eventId: ID!, commentText: String!): Event
        removeEvent(eventId: ID!): Event
        removeComment(eventId: ID!, commentId: ID!): Event
    }
`;

module.exports = typeDefs;