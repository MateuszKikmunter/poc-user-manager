//libs imports
import { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';

//local imports
import { HttpCode } from '../utils/http.code';


/**
 * Validation rules applied for user.
 */
export const loginUserRules = [
    check('email').isEmail().withMessage('Please enter a valid email.'),
    check('email').notEmpty().withMessage('Email is required.'),    
    check('password').notEmpty().withMessage('Password is required.'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
];

export const createOrUpdateUserRules = [
    check('email').isEmail().withMessage('Please enter a valid email.'),
    check('email').notEmpty().withMessage('Email is required.'),
    check('name').notEmpty().withMessage('Name is required.'),
    check('password').custom((password: string) => password?.length >= 8)
        .withMessage('Password is requred and must be at least 8 characters long')
];

/**
 * * Validates details provided by the user when creating or updating user.
 * * Returns HTTP 422 if invalid details provided.
 * @param req request
 * @param res response
 * @param next next function
 */
export const validateUserRequest = (req: Request, res: Response, next: NextFunction): void | Response => {
    
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        return res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ errors: validationErrors.array()?.map(err => err.msg) });
    }

    return next();
}