import joi from "joi";

export const signUpValidator = joi.object(
    {
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        birthDate:joi.date().required(),
        city:joi.string(),
        coutry:joi.string(),
        email:joi.string(),
        password:joi.string().min(5).max(250).required(),
        confirmPassword:joi.string().min(5).max(250).required()
    }
);