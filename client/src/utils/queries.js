import { gql } from '@apollo/client';

//example from module 21
export const QUERY_EVENTS = gql`
  query events($username: String) {
    events(username: $username) {
      _id
      eventText
      createdAt
      username
      commentCount
     comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;