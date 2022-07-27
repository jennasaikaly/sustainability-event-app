import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client';

//import { getMe, deleteEvent } from '../utils/API';
import Auth from '../utils/auth';
import { removeEventId, saveEventIds  } from '../utils/localStorage';
import { GET_ME } from "../utils/queries";
import { REMOVE_EVENT } from "../utils/mutations";

const SavedEvents = () => {

  const { loading, data } = useQuery(GET_ME);
  const [removeEvent] = useMutation(REMOVE_EVENT);
  const userData = data?.me || [];

  const handleDeleteEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeEvent({
        variables: { eventId: eventId },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }
      removeEventId(eventId);
    }catch (err) {
      console.error(err);
    }
  
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // sync localStorage with what was returned from the userData query
  const savedEventIds = userData.savedEvents.map((event) => event.eventId);
  saveEventIds(savedEventIds);




  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing Saved Events</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedEvents.length
            ? `Viewing ${userData.savedEvents.length} saved ${userData.savedEvents.length === 1 ? 'event' : 'events'}:`
            : 'You have no saved events!'}
        </h2>
        <CardColumns>
          {userData.savedEvents.map((event) => {
            return (
              <Card key={event.eventId} border='dark'>
                {event.image ? <Card.Img src={event.image} alt={`The cover for ${event.eventTitle}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{event.eventTitle}</Card.Title>
                  <p className='small'>Organizers: {event.organizers}</p>
                  <Card.Text>{event.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteEvent(event.eventId)}>
                    Delete this Event
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedEvents;