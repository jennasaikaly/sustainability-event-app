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
    const eventTitle = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const organizers = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const description = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const keywords = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const location = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const eventTime = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const eventDate = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const eventFees = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const contactInfo = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const additionalInfo = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const link = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdEvent = await Event.create({ 
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

    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { events: createdEvent._id } }
    );

    createdEvents.push(createdEvent);
  }

  // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomEventIndex = Math.floor(Math.random() * createdEvents.length);
    const { _id: eventId } = createdEvents[randomEventIndex];

    await Event.updateOne(
      { _id: eventId },
      { $push: { comments: { commentText, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
