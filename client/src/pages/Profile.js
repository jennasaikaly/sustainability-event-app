import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import EventList from '../components/EventList';
import CommentList from '../components/CommentList';
import EventForm from '../components/EventForm';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  return <Navigate to="/profile" />;
}

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this page. Use the navigation links above to sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <div className="flex-row mb-3">
      <h2 className="bg-dark text-secondary p-3 display-inline-block">
  Viewing {userParam ? `${user.username}'s` : 'your'} Events.
</h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <EventList events={user.events} title={`${user.username}'s Events...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <CommentList
            username={user.username}
            CommentCount={user.CommentCount}
            Comments={user.Comments}
          />
        </div>
      </div>

      <div className="mb-3">{!userParam && <EventForm />}</div>
    </div>
  );
};

export default Profile;
