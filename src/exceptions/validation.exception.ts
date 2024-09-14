import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  messages: string[];

  constructor(errors: string[] | string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        message: Array.isArray(errors) ? errors : [errors],
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
