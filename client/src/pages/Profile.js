import React from 'react';
import { useParams } from 'react-router-dom';

import EventList from '../components/EventList';
import CommentList from '../components/CommentList';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {user.username}'s profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <EventList Events={user.Events} title={`${user.username}'s Events...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <CommentList
            username={user.username}
            CommentCount={user.CommentCount}
            Comments={user.Comments}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;