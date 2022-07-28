import EventList from '../components/EventList';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
// import savedEvents from '../components/savedEvents';

const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_EVENTS);

    //for savedEvents component
    // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
// const { data: userData } = useQuery(QUERY_ME);

   // // if data exists, store it in the events constant we just created. If data is undefined, then save an empty array to the thoughts component.
    const events = data?.events || [];
    // console.log(events);
    const loggedIn = Auth.loggedIn();

    return (
        <main>
            
            <div className={`eventlist-col ${loggedIn && 'savedevent-col'}`}>
                     {loading ? (
            <div>Loading...</div>
        ) : (
            <EventList events={events} title="Local Events" />
        )} 
        {/* the props need to be edited  */}
                    {/* {loggedIn && userData ? (
  <div className="col-12 col-lg-3 mb-3">
    <SavedEvents
      savedEvent={userData.me.savedEvent}
     />
  </div>
) : null} */}
                    </div>
           
        </main>
    );
};

export default Home;