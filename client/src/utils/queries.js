import { gql } from '@apollo/client';

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
    eventTiming
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