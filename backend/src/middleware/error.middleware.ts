import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Error handler middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  logger.error(`Error: ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    logger.error(`Stack: ${err.stack}`);
  }
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

// Not found middleware
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}; 