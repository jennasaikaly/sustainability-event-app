import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../utils/queries';
import CommentList from '../components/CommentList';


const SingleEvent = props => {
  
  const { id: eventId } = useParams();

  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: eventId }
  });

  const event = data?.event || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
            <h2>{event.eventTitle}</h2>
          <span style={{ fontWeight: 700 }} className="text-light">
            {event.username}
            {event.organizers}
          </span>{' '}
          event on {event.eventDate} at {event.eventTime}
        </p>
        <div className="card-body">
          <p>
          {event.description}
          {event.keywords}
          {event.location}
          {event.image}
          {event.eventFees}
          {event.contactInfo}
          {event.additionalInfo}
          {event.link}
          
          </p>
        </div>
      </div>

      {event.commentCount > 0 && <CommentList comments={event.comments} />}
    </div>
  );
};

export default SingleEvent;
