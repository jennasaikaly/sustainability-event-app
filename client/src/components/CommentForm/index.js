import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ eventId }) => {
  const [formState, setFormState] = useState({
    commentText: '',
    username: '',
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: { eventId, ...formState},
      });

      setFormState({
        commentText: '',
        username: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
        setFormState({ ...formState, [name]: value });
        setCharacterCount(value.length);
      } else if (name !== 'commentText') {
        setFormState({ ...formState, [name]: value });
      }
  };

  return (
    <div className = "commentform-container">
      <h4>Add your comments or questions about this event here: </h4>
      
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
         <div className="col-12 col-lg-9">
            <label> Please Enter Your Username: 
          <input
            name="username"
            placeholder="Enter Your Username"
            value={formState.username}
            className="form-input w-100"
            onChange={handleChange}
          />
          </label>
        </div>

        <div className="col-12 col-lg-9">
            <label> Enter Any Questions or Comments Here: 
          <textarea
            name="commentText"
            placeholder="Add your comment..."
            value={formState.commentText}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
          </label>
          
        </div>

       

        <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
