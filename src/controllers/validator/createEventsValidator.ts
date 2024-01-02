import joi from "joi";

export const createEventsValidator = joi.object(
    {
        description: joi.string().min(5).max(250).required(),
        dayOfWeek: joi.string().valid("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday").required()
    }
);