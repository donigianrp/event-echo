// import prisma from '@/db';
import { PrismaClient } from '@prisma/client';
import {
  eventSeriesEvents,
  events,
  sourceContents,
  sourceContentsEvents,
} from './seedData';
const prisma = new PrismaClient();

async function main() {
  // USERS
  const matt = await prisma.user.upsert({
    where: { email: 'matthew.clunie@gmail.com' },
    update: {},
    create: {
      email: 'matthew.clunie@gmail.com',
      name: 'matt clunie',
      username: 'matt',
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
  const rob = await prisma.user.upsert({
    where: { email: 'rpdonigian@gmail.com' },
    update: {},
    create: {
      email: 'rpdonigian@gmail.com',
      name: 'rob donigian',
      username: 'rob',
      event_series: {},
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

  console.log('CREATED USERS DATA');
  console.log(matt);
  console.log(rich);
  console.log(rob);

  // Social Media Platform

  const youTube = await prisma.socialMediaPlatform.create({
    data: {
      name: 'YouTube',
    },
  });
  console.log('CREATED SOCIAL MEDIA PLATFORM DATA');
  console.log(youTube);

  // Source Content Creator

  const newYorkJets = await prisma.sourceContentCreator.create({
    data: {
      social_media_platform_id: 1,
      social_media_id: 'UCROj9vBjc4ZW3AL4cd_BjHg',
      name: '@nyjets',
    },
  });

  console.log('CREATED SOURCE CONTENT CREATOR DATA');
  console.log(newYorkJets);
  // Source Contents

  const newYorkJets2023PostGamesVideos = await prisma.sourceContent.createMany({
    data: sourceContents,
  });

  console.log('CREATED SOURCE CONTENTS DATA');
  console.log(newYorkJets2023PostGamesVideos);

  // Category

  const sports = await prisma.eventCategory.create({
    data: {
      title: 'Sports',
    },
  });

  console.log('CREATED EVENT CATEGORY DATA');
  console.log(sports);

  // Sub Category

  const football = await prisma.eventSubCategory.create({
    data: {
      title: 'American Football',
    },
  });

  console.log('CREATED EVENT SUB CATEGORY DATA');
  console.log(football);

  // Event Type

  const sportsFootball = await prisma.eventType.create({
    data: {
      category_id: 1,
      sub_category_id: 1,
    },
  });

  console.log('CREATED EVENT TYPE DATA');
  console.log(sportsFootball);

  // Event Series

  const newYorkJets2023PostGamesSeries = await prisma.eventSeries.create({
    data: {
      title: '2023 New York Jets Postgame Conferences',
      is_private: false,
      creator_id: userId,
    },
  });

  console.log('CREATED EVENT SERIES DATA');
  console.log(newYorkJets2023PostGamesSeries);

  // Events

  const newYorkJets2023PostGamesEvents = await prisma.event.createMany({
    data: events,
  });
  console.log('CREATED EVENTS DATA');
  console.log(newYorkJets2023PostGamesEvents);

  // EventSeriesEvents

  const newYorkJets2023PostGamesEventSeriesEvent =
    await prisma.eventSeriesEvent.createMany({
      data: eventSeriesEvents,
    });
  console.log('CREATED EVENT SERIES EVENTS DATA');
  console.log(newYorkJets2023PostGamesEventSeriesEvent);

  // SourceContentsEvents

  const newYorkJets2023PostGamesSourceContentsEvents =
    await prisma.sourceContentEvent.createMany({
      data: sourceContentsEvents,
    });
  console.log('CREATED EVENT SERIES EVENTS DATA');
  console.log(newYorkJets2023PostGamesSourceContentsEvents);
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
