"use client";

import { useFormState, useFormStatus } from "react-dom";
import { editEventSeries } from "../event_series/actions";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { redirect } from "next/navigation";

const initialState = {
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" aria-disabled={pending}>
            Submit
        </Button>
    );
}

const EditEventSeriesForm = ({ eventSeries }: any) => {
    const [state, formAction] = useFormState(editEventSeries, initialState);
    const [title, setTitle] = useState(eventSeries.title);
    const [description, setDescription] = useState(
        eventSeries.description || ""
    );
    const [checked, setChecked] = useState(eventSeries.is_private);
    const [cancelled, setCancelled] = useState(false);

    if (cancelled) {
        redirect(`/event_series/${eventSeries.id}`);
    }

    return (
        <div className="flex p-10 lg:w-1/2 mx-auto my-10 align-middle">
            <form action={formAction} className="w-full">
                <div className="flex flex-col gap-6">
                    <h1 className="text-xl">Edit Event Series</h1>
                    <Input
                        type="hidden"
                        name="id"
                        value={eventSeries.id}
                    ></Input>
                    <Input
                        placeholder="Title"
                        type="text"
                        name="title"
                        required
                        className="border-b p-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></Input>
                    <Textarea
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Textarea>
                    <div className="flex gap-2 leading-none">
                        <Checkbox
                            id="is_private"
                            name="is_private"
                            checked={checked}
                            onCheckedChange={setChecked}
                        />
                        <Label htmlFor="is_private">Private</Label>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setCancelled(true)}
                        >
                            Cancel
                        </Button>
                        <SubmitButton />
                    </div>
                    <p aria-live="polite" className="sr-only" role="status">
                        {state?.message}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default EditEventSeriesForm;
