import EventList from '../components/EventList';
// import { useQuery } from '@apollo/client';
// import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
    // use useQuery hook to make query request
    // const { loading, data } = useQuery(QUERY_EVENTS);
    // const events = data?.events || [];
    //   console.log(events);

    return (
        <main>
            <div className="eventlist-container">
                <div className="col-12 mb-3">
                    {/* {loading ? (
          <div>Loading...</div>
        ) : (
          <EventList events={events} title="Some Feed for Event(s)..." />
        )} */}
                    <EventList />
                    </div>
            </div>
        </main>
    );
};

export default Home;