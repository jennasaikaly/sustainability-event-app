import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];
    console.log(events);
    return (
      <main>
        <div className='flex-row justify-space-between'>
          <div className='col-12 mb-3'>{/* PRINT EVENT LIST */}</div>
        </div>
      </main>
    );
  };