import prisma from "@/db";

export async function getEventSeriesList() {
  try {
    const eventSeries = await prisma.eventSeries.findMany();
  } catch (e) {}
}
export async function getEventSeries() {}
export async function getEvent() {}
