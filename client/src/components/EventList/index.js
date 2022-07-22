import React from 'react';

const EventList = () => {
    return (
            <div>
              <h3 className="title">Local Events!</h3>
             
                  <div className="card mb-3">
                    <p className="card-header">
                      <h4>Free Native Plant Giveaway!</h4>
                       <p>Sept 10, 1-4pm</p>
                      
                      
                    </p>
                    <div className="card-body">
                      <img alt=""></img>
                     
                      <p className="mb-0">
                        Free, native, wildflowers, plants
                      </p>
                      <p>Organized by Ottawa Wildflower Seed Library</p>
                    </div>
                    <div className="card-footer">
                    Comments: 1
                    People Attending: 15
                    </div>
                  </div>
                
            </div>
          );

}
// const EventList = ({ events, title }) => {
//   if (!events.length) {
//     return <h3>There are no Events yet</h3>;
//   }

//   return (
//     <div>
//       <h3>{title}</h3>
//       {events &&
//         events.map(event => (
//           <div key={event._id} className="card mb-3">
//             <p className="card-header">
//               {event.title}
//               {event.date} at {event.time}
//               Organized by {event.username}
//             </p>
//             <div className="card-body">
//               <img alt="">{event.img}</img>
//               <p className="mb-0">
//                 {event.keywords}
//                 Comments: {event.commentCount}
//                 People Attending: {event.attendanceCount}
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

export default EventList;