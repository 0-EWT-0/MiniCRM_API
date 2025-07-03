import { Request, Response, NextFunction } from "express";

type AsyncController<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<void>;

const asyncHandler = <T extends Request = Request>(fn: AsyncController<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as T, res, next)).catch(next);
  };
};

export default asyncHandler;
