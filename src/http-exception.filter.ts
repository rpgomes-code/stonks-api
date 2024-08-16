import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException,
  Inject,
  Logger
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from './database/log/log.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(@Inject(LogService) private logService: LogService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { method, url } = request;
    const userAgent = request.get('user-agent') || '';

    const logMessage = `(${status} - ${method} - ${url}) - ${userAgent} - (${exception.message})`;

    const logEntry = {
      origin: request.ip,
      destination: url,
      message: logMessage,
      httpCode: status,
      isError: true
    };

    try {
      await this.logService.createLog(logEntry);
    } catch (error) {
      this.logger.error(`Failed to create log entry: ${error.message}`, error.stack);
    }

    // Log to console as well
    this.logger.error(logMessage);

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: url,
        message: exception.message,
      });
  }
}