import { buttonVariants } from "@/components/ui/button";
import prisma from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const eventSeries = await prisma.eventSeries.findMany({});
    return eventSeries.map((series) => {
        id: series.id;
    });
}

export default async function EventSeriesPage({
    params,
}: {
    params: { id: string };
}) {
    const id = Number(params.id);
    const eventSeries = await prisma.eventSeries.findUnique({
        where: { id },
    });

    if (!eventSeries) notFound();

    return (
        <div className="flex flex-col gap-4 p-10">
            <div className="flex justify-between">
                <h1 className="text-3xl font-medium">{eventSeries.title}</h1>
                <Link
                    className={buttonVariants({ variant: "default" })}
                    href={`/event_series/${params.id}/edit`}
                >
                    Edit
                </Link>
            </div>
            <br />
            {eventSeries.description}
        </div>
    );
}
