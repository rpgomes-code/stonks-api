import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { LogService } from './database/log/log.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
  
    constructor(private logService: LogService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { ip, method, path: url } = request;
      const userAgent = request.get('user-agent') || '';
  
      const now = Date.now();
  
      return next.handle().pipe(
        tap(async (data) => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
          const contentLength = response.get('content-length');
  
          const logEntry = {
            origin: ip,
            destination: url,
            message: `(${statusCode} - ${method} - ${url}) - ${userAgent}`,
            httpCode: statusCode,
            isError: false,
          };
  
          try {
            await this.logService.createLog(logEntry);
          } catch (error) {
            this.logger.error(`Failed to create log entry: ${error.message}`, error.stack);
          }
  
          this.logger.log(
            `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${Date.now() - now}ms`,
          );
        }),
      );
    }
  }