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
        description: String
        keywords: String
        location: String
        eventTiming: String
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
`;

module.exports = typeDefs;