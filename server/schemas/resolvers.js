const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('events');
            // .populate('comments');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find().populate('events');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('events');
      },
      events: async (parent, { username }) => {
        return Event.find(username).sort({ createdAt: -1 });
      },
      event: async (parent, { eventId }) => {
        return Event.findOne({ _id: eventId });
      }
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        // First we create the user
        const user = await User.create({ username, email, password });
        // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
        const token = signToken(user);
        // Return an `Auth` object that consists of the signed token and user's information
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
        const user = await User.findOne({ email });
  
        // If there is no user with that email address, return an Authentication error stating so
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
        const correctPw = await user.isCorrectPassword(password);
  
        // If the password is incorrect, return an Authentication error stating so
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        // If email and password are correct, sign user into the application with a JWT
        const token = signToken(user);
  
        // Return an `Auth` object that consists of the signed token and user's information
        return { token, user };
      },
      addEvent: async (parent, {
          eventTitle, 
          organizers, 
          username, 
          description, 
          keywords,
          location, 
          eventTime, 
          eventDate, 
          eventFees, 
          contactInfo, 
          additionalInfo, 
          link, 
          image
        }) => {
        const event = await Event.create({
          eventTitle, 
          organizers, 
          username, 
          description, 
          keywords,
          location, 
          eventTime, 
          eventDate, 
          eventFees, 
          contactInfo, 
          additionalInfo, 
          link, 
          image
        });
  
        await User.findOneAndUpdate(
          { username: username },
          { $addToSet: { events: Event._id } }
        );
  
        return event;
      },
      addComment: async (parent, { eventId, commentText, username }) => {
        return Event.findOneAndUpdate(
          { _id: eventId },
          {
            $addToSet: { comments: { commentText, username} }
          },
          {
            new: true,
            runValidators: true
          }
        );
      },
      removeEvent: async (parent, { eventId }) => {
        return Event.findOneAndDelete({ _id: eventId });
      },
      removeComment: async (parent, { eventId, commentId }) => {
        return Event.findOneAndUpdate(
          { _id: eventId },
          { $pull: { comments: { _id: commentId } } },
          { new: true }
        );
      }
    }
  };
  
  module.exports = resolvers;
  

