import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../utils/queries';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
// import  compost from '../../src/assets/img/compost.jpg'
// import invasive from '../../src/assets/img/invasive.jpg'
// import pollinator from '../../src/assets/img/pollinator.jpg'
// import pollinator2 from '../../src/assets/img/pollinator2.jpg'
// import soilhealth from '../../src/assets/img/soilhealth.jpg'


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
      <div className="single-event-container">
        <div className="single-event-header">
            <h2>{event.eventTitle}</h2>
          <span style={{ fontWeight: 700 }} className="text-light">
          
            
            
          </span>{' '}
          <p>{event.eventDate} at {event.eventTime}</p>
        </div>
                <div className="single-event-body">
                <p><span className='eventtitle'>Event Added by:{' '}</span> {event.username}</p>
          <p><span className='eventtitle'>Organized by:{' '}</span>{event.organizers}</p>
          <p><span className='eventtitle'>Description:{' '}</span> {event.description}</p>
          <p><span className='eventtitle'>Keywords:{' '}</span>{event.keywords}</p>
          <p><span className='eventtitle'>Location:{' '}</span>{event.location}</p>
          <img alt="" src={require('../assets/img/' + event.image)}></img>
          <p><span className='eventtitle'>Fees:{' '}</span>{event.eventFees}</p>
          <p><span className='eventtitle'>Contact Info:{' '}</span>{event.contactInfo}</p>
          <p><span className='eventtitle'>Additional Info:{' '}</span>{event.additionalInfo}</p>
          <p><span className='eventtitle'>Event Link:{' '}</span>{event.link}</p>
        </div>
      </div>

      {event.commentCount > 0 && <CommentList comments={event.comments} />}

      { <CommentForm eventId={event._id} />}
    </div>
  );
};

export default SingleEvent;