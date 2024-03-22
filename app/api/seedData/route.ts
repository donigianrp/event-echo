import prisma from '@/db';
import fs from 'fs';
import * as path from 'path';

export async function GET(request: Request) {
  try {
    var targetPath = path.resolve(__dirname, '../../../../../prisma/seed'); // Resolves to "C:\Projects\event-echo\.next\server\app\prisma\seed\seedData"
    const writeJSONFile = (fileName: string, data: any) => {
      const filePath = path.join(targetPath, fileName);
      fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error(`Error writing ${fileName}:`, err);
        } else {
          console.log(`${fileName} has been saved.`);
        }
      });
    };

    const events = await prisma.event.findMany();
    const sourceContents = await prisma.sourceContent.findMany();
    const sourceContentEvents = await prisma.sourceContentEvent.findMany();
    const eventSeries = await prisma.eventSeries.findMany();
    const eventTagEventSeries = await prisma.eventTagEventSeries.findMany();
    const eventCategories = await prisma.eventCategory.findMany();
    const eventSubCategories = await prisma.eventSubCategory.findMany();
    const sourceContentCreators = await prisma.sourceContentCreator.findMany();
    const socialMediaPlatforms = await prisma.socialMediaPlatform.findMany();
    const comments = await prisma.comment.findMany();
    const eventTags = await prisma.eventTag.findMany();
    const socialMediaTags = await prisma.socialMediaTag.findMany();
    const accounts = await prisma.account.findMany();
    const sessions = await prisma.session.findMany();
    const users = await prisma.user.findMany();
    const subscriptions = await prisma.subscriptions.findMany();
    const userSeriesLikes = await prisma.userSeriesLike.findMany();
    const userSeriesFavorites = await prisma.userSeriesFavorite.findMany();
    const verificationTokens = await prisma.verificationToken.findMany();

    writeJSONFile('events.json', events);
    writeJSONFile('sourceContents.json', sourceContents);
    writeJSONFile('sourceContentEvents.json', sourceContentEvents);
    writeJSONFile('eventSeries.json', eventSeries);
    writeJSONFile('eventCategories.json', eventCategories);
    writeJSONFile('eventSubCategories.json', eventSubCategories);
    writeJSONFile('sourceContentCreators.json', sourceContentCreators);
    writeJSONFile('socialMediaPlatforms.json', socialMediaPlatforms);
    writeJSONFile('comments.json', comments);
    writeJSONFile('eventTags.json', eventTags);
    writeJSONFile('eventTagEventSeries.json', eventTagEventSeries);
    writeJSONFile('socialMediaTags.json', socialMediaTags);
    writeJSONFile('accounts.json', accounts);
    writeJSONFile('sessions.json', sessions);
    writeJSONFile('users.json', users);
    writeJSONFile('subscriptions.json', subscriptions);
    writeJSONFile('userSeriesLikes.json', userSeriesLikes);
    writeJSONFile('userSeriesFavorites.json', userSeriesFavorites);
    writeJSONFile('verificationTokens.json', verificationTokens);

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}
