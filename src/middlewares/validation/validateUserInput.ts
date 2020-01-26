import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator/check';

import { EnvTypes, environment } from '../../constants/constants';
import { errorHandler } from '../../utils/index';

const conditions = [
  body('title')
    .optional()
    .isString()
    .trim()
    .escape(),
  body('author')
    .optional()
    .isString()
    .trim()
    .escape(),
  body('genre')
    .optional()
    .isArray(),
  body('length')
    .optional()
    .isNumeric()
    .custom((val: number) => val > 0),
];

const development = (req: Request, res: Response, next: NextFunction): void | Response => {
  try {
    validationResult(req).throw();
    console.log('<<< VALIDATION PASSED >>>');
    return next();
  } catch (err) {
    console.log('<<< VALDIATION FAILED >>>');
    return errorHandler(res, 403, JSON.stringify(err.array()));
  }
};

const production = (req: Request, res: Response, next: NextFunction): void | Response => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    return errorHandler(res, 403, 'dont be too smart');
  }
};

const middleware = {
  [EnvTypes.PROD]: [...conditions, production],
  [EnvTypes.DEV]: [...conditions, development],
  [EnvTypes.TEST]: [...conditions, development],
};

export default middleware[environment];
