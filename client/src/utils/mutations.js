import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_EVENT = gql `
  mutation saveEvent($input : savedEvent!) {
    saveEvent (input: $input) {
      _id
      username
      email
      eventCount
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
  }
`;

export const REMOVE_EVENT = gql `
  mutation removeEvent ($eventId: String!) {
    removeEvent(eventId: $eventId) {
      _id
      username
      email
      eventCount
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
  }
`