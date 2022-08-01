import React from 'react';
import { Link } from 'react-router-dom';
// import pollinator from '../../assets/img/pollinator.jpg'

// const EventList = (events, title) => {
//   // if (!events.length) {
//   //   return <h3>No Events Yet</h3>;
//   // }
//   return (
//     <div>
//       <h3 className="title">Local Events!</h3>

//       <div className="card mb-3">
//         <div className="card-header">
//           <Link to={`/event/${events._id}`} className="link"
//           ><h4>Free Native Plant Giveaway!</h4></Link>{' '}
//           <p>Sept 10, 1-4pm</p>


//         </div>
//         <div className="card-body">
//           <img alt=""></img>

//           <p className="mb-0">
//             Free, native, wildflowers, plants
//           </p>
//           <p>Organized by Ottawa Wildflower Seed Library</p>
//         </div>
//         <div className="card-footer">
//           Comments: 1
//           People Attending: 15
//         </div>
//       </div>

//     </div>
//   );

// }

const EventList = ({ events, title }) => {
  console.log(events);
  if (!events) {
    return <h3>There are no Events yet</h3>;
  }

return (
  <div className='eventlist-container'>
    
    <h3 className='eventlist-title'>{title}</h3>
    <div className='eventlist-card-container'>
    {events &&
      events.map(event => (
        <div key={event._id} className="card">
          <div className="card-header">
            <p><Link
              to={`/event/${event._id}`}
              style={{ fontWeight: 700 }}
              className="text-light"
            >{event.eventTitle} </Link></p>
            <p>{event.eventDate} at {event.eventTime} </p>
            

          </div>
          <div className="card-body">
          {/* <img alt="" src={pollinator} /> */}
         {/* <img alt="" src={require('../../assets/img/' + event.image)}/> */}
            <p className="card-keywords">
              {event.keywords} </p>
              
                  

           
          </div>
          <div className='card-footer'>
          <span className='organizedby'> Event by:
                  <Link
                    to={`/profile/${event.username}`}
                    style={{ fontWeight: 700 }}
                    className="text-light"
                  >   {'    '}   
                    { event.username }
                  </Link></span>
          <Link to={`/event/${event._id}`}>
                
                <p className="mb-0">
                <i className="fa-solid fa-comment"></i>  {' '}
                  {event.commentCount ? 'comments' : 'Comment'} 
                </p>
              </Link>
          </div>
        </div>
      ))}
      </div>
  </div>
);
};

export default EventList;
