import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      events{
        _id
        eventId
        username
        eventTitle
        organizers
        description
        keywords
        location
        image
        eventTime
        eventDate
        eventFees
        contactInfo
        additionalInfo    
        link
        createdAt
        commentCount
        comments {
          _id
          createdAt
          username
          commentText
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedEvent {
        _id
        eventId
        username
        eventTitle
        organizers
        description
        keywords
        location
        image
        eventTime
        eventDate
        eventFees
        contactInfo
        additionalInfo    
        link
        createdAt
        commentCount
        comments {
          _id
          createdAt
          username
          commentText
        }
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
    query events {
    events {
    _id
    username
    eventTitle
    organizers
    description
    keywords
    location
    image
    eventDate
    eventTime
    eventFees
    contactInfo
    additionalInfo    
    link
    createdAt
    comments {
        _id
        createdAt
        username
        commentText
        }
    }
    }
`;

export const QUERY_EVENT = gql`
  query event($eventId: ID!) {
    event(eventId: $eventId) {
    _id
    username
    eventTitle
    organizers
    description
    keywords
    location
    image
    eventTime
    eventDate
    eventFees
    contactInfo
    additionalInfo    
    link
    createdAt
    comments {
        _id
        createdAt
        username
        commentText
      }
    
    }
  }
`;
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      commentCount
      comments {
        _id
        commentText
        createdAt
      }
      events {
        _id
        eventTitle
        createdAt
        CommentCount
      }
    }
  }
`;
