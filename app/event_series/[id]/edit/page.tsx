import EditEventSeriesForm from "@/components/EditEventSeriesForm";
import prisma from "@/db";

const EventSeriesEdit = async ({ params }: { params: { id: string } }) => {
    const eventSeries = await prisma.eventSeries.findUnique({
        where: { id: Number(params.id) },
    });

    return <EditEventSeriesForm eventSeries={eventSeries} />;
};

export default EventSeriesEdit;
