import EventList from '../components/EventList';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import EventForm from '../components/EventForm';

const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];
    console.log(events);
    const loggedIn = Auth.loggedIn();
    return (
        <main>
            <div className="eventlist-container">
                {loggedIn && (
                    <div className="col-12 mb-3">
                        <EventForm />
                    </div>
                )}
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <EventList thoughts={events} title="Some Feed for Thought(s)..." />
                    )}
                </div>

            </div>
        </main>
    );
};

export default Home;