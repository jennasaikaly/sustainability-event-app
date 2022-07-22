import React from 'react';

const EventList = ({ events, title }) => {
  if (!events.length) {
    return <h3>No events Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {events &&
        events.map(event => (
          <div key={event._id} className="card mb-3">
            <p className="card-header">
              {event.username}
              event on {event.createdAt}
            </p>
            <div className="card-body">
              <p>{event.eventText}</p>
              <p className="mb-0">
                Reactions: {event.reactionCount} || Click to{' '}
                {event.reactionCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EventList;