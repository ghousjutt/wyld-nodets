const NotFound = (req: any, res: any, next: any) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const ErrorHandler = (err: any, req: any, res: any, next: any) => {
  const errorCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(errorCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { NotFound, ErrorHandler };
