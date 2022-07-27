import EventList from '../components/EventList';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_EVENTS);
   // // if data exists, store it in the events constant we just created. If data is undefined, then save an empty array to the thoughts component.
    const events = data?.events || [];
    // console.log(events);
    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div className="eventlist-container">
                <div className="col-12 mb-3">
                     {loading ? (
            <div>Loading...</div>
        ) : (
            <EventList events={events} title="Some Local Event(s)..." />
        )} 
                    
                    </div>
            </div>
        </main>
    );
};

export default Home;