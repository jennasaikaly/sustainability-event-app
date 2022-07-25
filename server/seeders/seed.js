const faker = require('faker');

const db = require('../config/connection');
const { Event, User } = require('../models');

db.once('open', async () => {
  await Event.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

 
  // create events
  let createdEvents = [];
  for (let i = 0; i < 100; i += 1) {
    const eventText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const eventTitle = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdEvent = await Event.create({ eventText, eventTitle, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { events: createdEvent._id } }
    );

    createdEvents.push(createdEvent);
  }

  // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomEventIndex = Math.floor(Math.random() * createdEvents.length);
    const { _id: eventId } = createdEvents[randomEventIndex];

    await Event.updateOne(
      { _id: eventId },
      { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
