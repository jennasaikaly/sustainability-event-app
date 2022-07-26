import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedEvent {
        # _id
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
    query events($username: String) {
    events(username: $username) {
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
    commentCount
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
  query event($id: ID!) {
    event(_id: $id) {
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
    commentCount
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