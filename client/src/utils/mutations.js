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

export const ADD_EVENT = gql `
  mutation addEvent(
    eventTitle: String!, 
    $organizers: String!, 
    $username: String!, 
    $description: String!, 
    $keywords: String!, 
    $location: String!, 
    $eventTime: String!, 
    $eventDate: String!, 
    $eventFees: String!, 
    $contactInfo: String!, 
    $additionalInfo: String!, 
    $link: String!, 
    $image: String!) {
      addEvent(
        eventTitle: $eventTitle, 
        organizers: $organizers, 
        username: $username, 
        description: $description, 
        keywords: $keywords, 
        location: $location, 
        eventTime: $eventTime, 
        eventDate: $eventDate, 
        eventFees: $eventFees, 
        contactInfo: $contactInfo, 
        additionalInfo: $additionalInfo, 
        link: $link, 
        image: $image){
          _id
          eventTitle
          organizers
          username
          description
          keywords
          location
          eventTime
          eventDate
          eventFees
          contactInfo
          additionalInfo
          link
          image
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
  mutation RemoveEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
      _id
      eventTitle
      organizers
      username
      description
      keywords
      location
      eventTime
      eventDate
      eventFees
      contactInfo
      additionalInfo
      link
      image
      createdAt
      comments {
        _id
        commentText
        username
        createdAt
      }
    }
  }
`;

export const REMOVE_SAVEDEVENT = gql `
  mutation removeEvent ($eventId: String!) {
    removeEvent(eventId: $eventId) {
      _id
      username
      email
      eventCount
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
  }
`

export const ADD_COMMENT = gql `
  mutation AddComment($eventId: ID!, $commentText: String!, $username: String!) {
    addComment(eventId: $eventId, commentText: $commentText, username: $username) {
      comments {
        _id
        commentText
        username
        createdAt
      }
    }
  }  

`;

export const REMOVE_COMMENT = gql `
  mutation RemoveComment($eventId: ID!, $commentId: ID!) {
    removeComment(eventId: $eventId, commentId: $commentId) {
      comments {
        _id
        commentText
        username
        createdAt
      }
    }
  }
`;
