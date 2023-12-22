"use client";

import { useFormState, useFormStatus } from "react-dom";
import { deleteEventSeries } from "../event_series/actions";
import { Button } from "./ui/button";

const initialState = {
    message: "",
};

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="outline" aria-disabled={pending}>
            Delete
        </Button>
    );
}

export function DeleteEventSeriesForm({
    id,
    title,
}: {
    id: number;
    title: string;
}) {
    const [state, formAction] = useFormState(deleteEventSeries, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="title" value={title} />
            <DeleteButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    );
}
