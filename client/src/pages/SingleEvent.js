import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../utils/queries';
import CommentList from '../components/CommentList';


const SingleEvent = props => {
  
  const { id: eventId } = useParams();

  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { eventId: eventId }
  });

  const event = data?.event || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
<<<<<<< HEAD
      <div className="single-event-container">
        <div className="single-event-header">
=======
      <div className="card mb-3">
        <div className="card-header">
>>>>>>> 4e47429d2ef891d984b05e6942a7f658a14194d5
            <h2>{event.eventTitle}</h2>
          <span style={{ fontWeight: 700 }} className="text-light">
            {event.username}
            {event.organizers}
          </span>{' '}
          event on {event.eventDate} at {event.eventTime}
<<<<<<< HEAD
=======
        </div>
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
>>>>>>> 4e47429d2ef891d984b05e6942a7f658a14194d5
        </div>
        <div className="single-event-body">
          <p>{event.description}</p>
          <p>{event.keywords}</p>
          <p>{event.location}</p>
          <p>{event.image}</p>
          <p>{event.eventFees}</p>
          <p>{event.contactInfo}</p>
          <p>{event.additionalInfo}</p>
          <p>{event.link}</p>
         </div>
      </div>

      {event.commentCount > 0 && <CommentList comments={event.comments} />}
    </div>
  );
};

export default SingleEvent;
