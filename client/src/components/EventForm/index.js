import React, {useState}  from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../../utils/queries';

vconst [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      // read what's currently in the cache
      const { events } = cache.readQuery({ query: QUERY_EVENTS });
  
      // prepend the newest event to the front of the array
      cache.writeQuery({
        query: QUERY_EVENTS,
        data: { events: [addEvent, ...events] }
      });
    }
  });;

const [eventText, setText] = useState('');

const EventForm = () => {
    const handleChange = event => {
        setText(event.target.value);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            // add event to database
            await addEvent({
              variables: { eventText }
            });
        
            // clear form value
            setText('');
          } catch (e) {
            console.error(e);
          }
      };

    return (
        <div>
            <form className = "flex-row justify-center "  onSubmit={handleFormSubmit} >
                <textarea 
                placeholder = "Event Title"
                value = {eventText}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}