import React, {useState}  from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../../utils/queries';


const EventForm = () => {

    const [formState, setFormState] = useState({
            eventTitle: '',
            username: '',
            organizers: '',
            description: '',
            keywords: '',
            location: '',
            image: '',
            eventTime: '',
            eventDate: '',
            eventFees: '',
            contactInfo: '',
            additionalInfo: '',    
            link: '',
    });

    const [addEvent, { error }] = useMutation(ADD_EVENT, {
        update(cache, { data: { addEvent } }) {

            try {
                // update me array's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                  query: QUERY_ME,
                  data: { me: { ...me, events: [...me.events, addEvent] } },
                });
              } catch (e) {
                console.warn("First event insertion by user!")
            }

        //   // read what's currently in the cache
        //   const { events } = cache.readQuery({ query: QUERY_EVENTS });
      
        //   // prepend the newest event to the front of the array
        //   cache.writeQuery({
        //     query: QUERY_EVENTS,
        //     data: { events: [addEvent, ...events] }
        //   });
        }
    });;
    
    //const [eventText, setText] = useState('');
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormState({...formState, [name]: value})
        //setFormState(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addEvent({
            variables: { ...formState },
          });
    
          setFormState({
            eventTitle: '',
            username: '',
            organizers: '',
            description: '',
            keywords: '',
            location: '',
            image: '',
            eventTime: '',
            eventDate: '',
            eventFees: '',
            contactInfo: '',
            additionalInfo: '',    
            link: '',
          });
        } catch (err) {
          console.error(err);
        }
    };

    return (
        <div>
            <form className = "flex-box justify-center "  onSubmit={handleFormSubmit} >
                <label> Enter Your Event's Title: 
                <input
                type='text'
                name = 'eventTitle'
                value = {formState.eventTitle || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                />
                </label>

                <label> Enter Your Username
                <input
                name = 'username'
                value = {formState.username || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                />
                </label>

                <label> Who is Organizing this Event:
                <input 
                name = "organizers"
                value = {formState.organizers || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                />
                </label>

                <label> Enter a Short Description of Your Event:
                <input 
                name = 'description'
                value = {formState.description || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                />
                </label>

                <label> Enter Some Keywords Describing Your Event:
                <input 
                name='keywords'
                value = {formState.keywords || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                />
                </label>

                <label> Enter the Event's Location:
                <input 
                name='location'
                value = {formState.location || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                />
                </label>

                <label> Enter the Event's Timing:
                <input 
                name='eventTime'
                value = {formState.eventTime || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                /></label>

                <label> Enter the Event's Date: 
                <input 
                name='eventDate'
                value = {formState.eventDate || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                /></label>

                <label> Enter Any Event Fees: 
                <input 
                name='eventFees'
                value = {formState.eventFees || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                /></label>

                <label> Enter Your Contact Info: 
                <input 
                name='contactInfo'
                value = {formState.contactInfo || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                /></label>

                <label> Enter Any Additional Information:
                <input 
                name='additionalInfo'
                value = {formState.additionalInfo || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                /></label>

                <label> Enter a Website Link For Your Event:
                <input 
                name='link'
                value = {formState.link || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                /></label>

                <label> Upload an Image for an Event Posting:
                <input 
                name='image'
                value = {formState.image || ''}
                className='form-input col-12 col-md-3'
                onChange={handleChange}
                /></label>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EventForm;