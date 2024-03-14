// import prisma from '@/db';
import { PrismaClient } from '@prisma/client';
import {
  eventSeriesEvents,
  events,
  sourceContents,
  sourceContentsEvents,
  comments,
  socialMediaPlatform,
  sourceContentCreator,
} from './seedData';
import * as fs from 'fs';
import * as path from 'path';
const prisma = new PrismaClient();

async function main() {
  async function createRecordsFromJSON(fileName: string, model: any) {
    try {
      const targetPath = path.resolve(__dirname, '../prisma/seed');
      const filePath = path.join(targetPath, fileName);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const results = await model.createMany({ data });
      console.log(`Records created from ${fileName}.`);
    } catch (error) {
      console.error(`Error creating records from ${fileName}:`, error);
    }
  }
  const matt = await prisma.user.upsert({
    where: { email: 'matthew.clunie@gmail.com' },
    update: {},
    create: {
      email: 'matthew.clunie@gmail.com',
      name: 'matt clunie',
      username: 'matt',
    },
  });
  const rob = await prisma.user.upsert({
    where: { email: 'rpdonigian@gmail.com' },
    update: {},
    create: {
      email: 'rpdonigian@gmail.com',
      name: 'robert donigian',
      username: 'rob',
    },
  });
  const rich = await prisma.user.upsert({
    where: { email: 'richdoherty7@gmail.com' },
    update: {},
    create: {
      email: 'richdoherty7@gmail.com',
      name: 'rich doherty',
      username: 'rich',
    },
  });
  let userId = 0;
  await prisma.user
    .findFirst({
      where: { email: 'matthew.clunie@gmail.com' },
    })
    .then((data) => {
      userId = data!.id;
    });
  await createRecordsFromJSON('users.json', prisma.user);
  console.log('CREATED USERS DATA');
  console.log(matt);
  console.log(rob);
  console.log(rich);

  await createRecordsFromJSON('eventCategories.json', prisma.eventCategory);
  await createRecordsFromJSON(
    'eventSubCategories.json',
    prisma.eventSubCategory,
  );
  await createRecordsFromJSON('eventSeries.json', prisma.eventSeries);
  await createRecordsFromJSON('events.json', prisma.event);
  await createRecordsFromJSON(
    'socialMediaPlatforms.json',
    prisma.socialMediaPlatform,
  );
  await createRecordsFromJSON(
    'sourceContentCreators.json',
    prisma.sourceContentCreator,
  );
  await createRecordsFromJSON('sourceContents.json', prisma.sourceContent);
  await createRecordsFromJSON(
    'sourceContentEvents.json',
    prisma.sourceContentEvent,
  );
  await createRecordsFromJSON('comments.json', prisma.comment);
  await createRecordsFromJSON('eventTags.json', prisma.eventTag);
  await createRecordsFromJSON(
    'eventTagEventSeries.json',
    prisma.eventTagEventSeries,
  );
  await createRecordsFromJSON('socialMediaTags.json', prisma.socialMediaTag);
  await createRecordsFromJSON('sessions.json', prisma.session);
  await createRecordsFromJSON('subscriptions.json', prisma.subscriptions);
  await createRecordsFromJSON('userSeriesLikes.json', prisma.userSeriesLike);
  await createRecordsFromJSON(
    'userSeriesFavorites.json',
    prisma.userSeriesFavorite,
  );
  await createRecordsFromJSON(
    'verificationTokens.json',
    prisma.verificationToken,
  );
  await createRecordsFromJSON('accounts.json', prisma.account);
  // -------------------------------------------------------------------------------------
  //USERS
  // const rob = await prisma.user.upsert({
  //   where: { email: 'rpdonigian@gmail.com' },
  //   update: {},
  //   create: {
  //     email: 'rpdonigian@gmail.com',
  //     name: 'rob donigian',
  //     username: 'rob',
  //     event_series: {},
  //   },
  // });
  // const matt = await prisma.user.upsert({
  //   where: { email: 'matthew.clunie@gmail.com' },
  //   update: {},
  //   create: {
  //     email: 'matthew.clunie@gmail.com',
  //     name: 'matt clunie',
  //     username: 'matt',
  //   },
  // });
  // const rich = await prisma.user.upsert({
  //   where: { email: 'richdoherty7@gmail.com' },
  //   update: {},
  //   create: {
  //     email: 'richdoherty7@gmail.com',
  //     name: 'rich doherty',
  //     username: 'rich',
  //   },
  // });
  // let userId = 0;
  // await prisma.user
  //   .findFirst({
  //     where: { email: 'matthew.clunie@gmail.com' },
  //   })
  //   .then((data) => {
  //     userId = data!.id;
  //   });
  // console.log('CREATED USERS DATA');
  // console.log(matt);
  // console.log(rich);
  // // console.log(rob);

  // // Social Media Platform
  // const youTube = await prisma.socialMediaPlatform.create({
  //   data: socialMediaPlatform,
  // });
  // console.log('CREATED SOCIAL MEDIA PLATFORM DATA');
  // console.log(youTube);
  // // Source Content Creator
  // const newYorkJets = await prisma.sourceContentCreator.create({
  //   data: sourceContentCreator,
  // });
  // console.log('CREATED SOURCE CONTENT CREATOR DATA');
  // console.log(newYorkJets);
  // // Source Contents
  // const newYorkJets2023PostGamesVideos = await prisma.sourceContent.createMany({
  //   data: sourceContents,
  // });
  // console.log('CREATED SOURCE CONTENTS DATA');
  // console.log(newYorkJets2023PostGamesVideos);
  // // Category
  // const sports = await prisma.eventCategory.createMany({
  //   data: [
  //     { label: 'Sports', value: 'sports' },
  //     { label: 'Music', value: 'music' },
  //     { label: 'Technology', value: 'technology' },
  //     { label: 'Food and Drink', value: 'foodAndDrink' },
  //     { label: 'Entertainment', value: 'entertainment' },
  //     { label: 'Fitness and Wellness', value: 'fitnessAndWellness' },
  //     { label: 'Arts and Culture', value: 'artsAndCulture' },
  //     { label: 'Business and Networking', value: 'businessAndNetworking' },
  //   ],
  // });
  // console.log('CREATED EVENT CATEGORY DATA');
  // console.log(sports);
  // // Sub Category
  // const football = await prisma.eventSubCategory.createMany({
  //   data: [
  //     { label: 'NFL', value: 'nfl', category_value: 'sports' },
  //     { label: 'MLB', value: 'mlb', category_value: 'sports' },
  //     { label: 'NHL', value: 'nhl', category_value: 'sports' },
  //     { label: 'NBA', value: 'nba', category_value: 'sports' },
  //     { label: 'MLS', value: 'mls', category_value: 'sports' },
  //     { label: 'Rock', value: 'rock', category_value: 'music' },
  //     { label: 'Pop', value: 'pop', category_value: 'music' },
  //     { label: 'Hip Hop', value: 'hipHop', category_value: 'music' },
  //     { label: 'Jazz', value: 'jazz', category_value: 'music' },
  //     { label: 'Electronic', value: 'electronic', category_value: 'music' },
  //     {
  //       label: 'Software Development',
  //       value: 'softwareDevelopment',
  //       category_value: 'technology',
  //     },
  //     { label: 'Hardware', value: 'hardware', category_value: 'technology' },
  //     {
  //       label: 'Artificial Intelligence',
  //       value: 'artificialIntelligence',
  //       category_value: 'technology',
  //     },
  //     {
  //       label: 'Cybersecurity',
  //       value: 'cybersecurity',
  //       category_value: 'technology',
  //     },
  //     {
  //       label: 'Mobile Development',
  //       value: 'mobileDevelopment',
  //       category_value: 'technology',
  //     },
  //     {
  //       label: 'Restaurants',
  //       value: 'restaurants',
  //       category_value: 'foodAndDrink',
  //     },
  //     {
  //       label: 'Cooking Classes',
  //       value: 'cookingClasses',
  //       category_value: 'foodAndDrink',
  //     },
  //     {
  //       label: 'Wine Tasting',
  //       value: 'wineTasting',
  //       category_value: 'foodAndDrink',
  //     },
  //     {
  //       label: 'Coffee Events',
  //       value: 'coffeeEvents',
  //       category_value: 'foodAndDrink',
  //     },
  //     {
  //       label: 'Food Festivals',
  //       value: 'foodFestivals',
  //       category_value: 'foodAndDrink',
  //     },
  //     { label: 'Movies', value: 'movies', category_value: 'entertainment' },
  //     { label: 'Theater', value: 'theater', category_value: 'entertainment' },
  //     {
  //       label: 'Comedy Shows',
  //       value: 'comedyShows',
  //       category_value: 'entertainment',
  //     },
  //     { label: 'Concerts', value: 'concerts', category_value: 'entertainment' },
  //     {
  //       label: 'Festivals',
  //       value: 'festivals',
  //       category_value: 'entertainment',
  //     },
  //     { label: 'Yoga', value: 'yoga', category_value: 'fitnessAndWellness' },
  //     {
  //       label: 'Running',
  //       value: 'running',
  //       category_value: 'fitnessAndWellness',
  //     },
  //     {
  //       label: 'Gym Workouts',
  //       value: 'gymWorkouts',
  //       category_value: 'fitnessAndWellness',
  //     },
  //     {
  //       label: 'Meditation',
  //       value: 'meditation',
  //       category_value: 'fitnessAndWellness',
  //     },
  //     {
  //       label: 'Wellness Retreats',
  //       value: 'wellnessRetreats',
  //       category_value: 'fitnessAndWellness',
  //     },
  //     {
  //       label: 'Art Exhibitions',
  //       value: 'artExhibitions',
  //       category_value: 'artsAndCulture',
  //     },
  //     { label: 'Museums', value: 'museums', category_value: 'artsAndCulture' },
  //     {
  //       label: 'Literature Events',
  //       value: 'literatureEvents',
  //       category_value: 'artsAndCulture',
  //     },
  //     {
  //       label: 'Performing Arts',
  //       value: 'performingArts',
  //       category_value: 'artsAndCulture',
  //     },
  //     {
  //       label: 'Cultural Festivals',
  //       value: 'culturalFestivals',
  //       category_value: 'artsAndCulture',
  //     },
  //     {
  //       label: 'Conferences',
  //       value: 'conferences',
  //       category_value: 'businessAndNetworking',
  //     },
  //     {
  //       label: 'Workshops',
  //       value: 'workshops',
  //       category_value: 'businessAndNetworking',
  //     },
  //     {
  //       label: 'Networking Events',
  //       value: 'networkingEvents',
  //       category_value: 'businessAndNetworking',
  //     },
  //     {
  //       label: 'Trade Shows',
  //       value: 'tradeShows',
  //       category_value: 'businessAndNetworking',
  //     },
  //     {
  //       label: 'Business Seminars',
  //       value: 'businessSeminars',
  //       category_value: 'businessAndNetworking',
  //     },
  //   ],
  // });
  // console.log('CREATED EVENT SUB CATEGORY DATA');
  // console.log(football);
  // // Event Type
  // const sportsFootball = await prisma.eventType.createMany({
  //   data: [
  //     { category_id: 1, sub_category_id: 1 },
  //     { category_id: 1, sub_category_id: 2 },
  //     { category_id: 1, sub_category_id: 3 },
  //     { category_id: 1, sub_category_id: 4 },
  //     { category_id: 1, sub_category_id: 5 },
  //     { category_id: 2, sub_category_id: 6 },
  //     { category_id: 2, sub_category_id: 7 },
  //     { category_id: 2, sub_category_id: 8 },
  //     { category_id: 2, sub_category_id: 9 },
  //     { category_id: 2, sub_category_id: 10 },
  //     { category_id: 3, sub_category_id: 11 },
  //     { category_id: 3, sub_category_id: 12 },
  //     { category_id: 3, sub_category_id: 13 },
  //     { category_id: 3, sub_category_id: 14 },
  //     { category_id: 3, sub_category_id: 15 },
  //     { category_id: 4, sub_category_id: 16 },
  //     { category_id: 4, sub_category_id: 17 },
  //     { category_id: 4, sub_category_id: 18 },
  //     { category_id: 4, sub_category_id: 19 },
  //     { category_id: 4, sub_category_id: 20 },
  //     { category_id: 5, sub_category_id: 21 },
  //     { category_id: 5, sub_category_id: 22 },
  //     { category_id: 5, sub_category_id: 23 },
  //     { category_id: 5, sub_category_id: 24 },
  //     { category_id: 5, sub_category_id: 25 },
  //     { category_id: 6, sub_category_id: 26 },
  //     { category_id: 6, sub_category_id: 27 },
  //     { category_id: 6, sub_category_id: 28 },
  //     { category_id: 6, sub_category_id: 29 },
  //     { category_id: 6, sub_category_id: 30 },
  //     { category_id: 7, sub_category_id: 31 },
  //     { category_id: 7, sub_category_id: 32 },
  //     { category_id: 7, sub_category_id: 33 },
  //     { category_id: 7, sub_category_id: 34 },
  //     { category_id: 7, sub_category_id: 35 },
  //     { category_id: 8, sub_category_id: 36 },
  //     { category_id: 8, sub_category_id: 37 },
  //     { category_id: 8, sub_category_id: 38 },
  //     { category_id: 8, sub_category_id: 39 },
  //     { category_id: 8, sub_category_id: 40 },
  //   ],
  // });
  // console.log('CREATED EVENT TYPE DATA');
  // console.log(sportsFootball);
  // // Event Series
  // const newYorkJets2023PostGamesSeries = await prisma.eventSeries.create({
  //   data: {
  //     title: '2023 New York Jets Postgame Conferences',
  //     is_private: false,
  //     creator_id: userId,
  //   },
  // });
  // console.log('CREATED EVENT SERIES DATA');
  // console.log(newYorkJets2023PostGamesSeries);
  // // Events
  // const newYorkJets2023PostGamesEvents = await prisma.event.createMany({
  //   data: events,
  // });
  // console.log('CREATED EVENTS DATA');
  // console.log(newYorkJets2023PostGamesEvents);
  // // EventSeriesEvents
  // const newYorkJets2023PostGamesEventSeriesEvent =
  //   await prisma.eventSeriesEvent.createMany({
  //     data: eventSeriesEvents,
  //   });
  // console.log('CREATED EVENT SERIES EVENTS DATA');
  // console.log(newYorkJets2023PostGamesEventSeriesEvent);
  // // SourceContentsEvents
  // const newYorkJets2023PostGamesSourceContentsEvents =
  //   await prisma.sourceContentEvent.createMany({
  //     data: sourceContentsEvents,
  //   });
  // console.log('CREATED EVENT SERIES EVENTS DATA');
  // console.log(newYorkJets2023PostGamesSourceContentsEvents);
  // // Comments
  // const newYorkJets2023PostGamesComments = await prisma.comment.createMany({
  //   data: comments,
  // });
  // console.log('CREATED COMMENTS DATA');
  // console.log(newYorkJets2023PostGamesComments);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
