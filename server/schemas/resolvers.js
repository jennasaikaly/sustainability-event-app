const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
      me: async (parent, {username}, context) => {
        if (context.user) {
          const userData = await User.findOne({ username: context.user.username })
            .select('-__v -password')
            .populate('events')
            .populate('comments');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find()
        .select('-__v -password')
        .populate('events');
      },
      // user: async (parent, args, context) => {
      //   if (context.user){
      //   let foundUser = await User.findOne({ username: context.user.username})
      //   .select('-__v -password')
      //   .populate('events');
      //   console.log(foundUser);
      //   return foundUser; 
      // }
      // }, 
      user: async (parent, {username}) => {
        let foundUser = await User.findOne({ username: username })
        .select('-__v -password')
        .populate('events');
        console.log(foundUser);
        return foundUser; 
      }, 
      // user: async (parent, { username }) => {
      //   return User.findOne({ username })
      //   .select('-__v -password')
      //   .populate('events');
      // },
      events: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Event.find(params).sort({ createdAt: -1 });
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
      addEvent: async (parent, args
        , context) => {
        if (context.user){
        const event = await Event.create({
          ...args, username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id :context.user._id },
          { $addToSet: { events: event._id } }, 
          {new: true}
        );
  
        return event;
      }
  
        

        throw new AuthenticationError('You need to be logged in!');
      },
      addComment: async (parent, { eventId, commentText}, context) => {
        if (context.user) {
          let updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId },
            {
              $push: { comments: { commentText, username: context.user.username} }
            },
            {
              new: true,
              runValidators: true
            }
          );
          return updatedEvent;
        }
       
        throw new AuthenticationError('You need to be logged in!');
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
      },
      //saved events 
      



    removeEvent: async (parent, args, context) => {
        if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedEvents: { eventId: args.eventId } } },
            { new: true }
        );

        return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
    }
    }
  };
  
  module.exports = resolvers;
  

