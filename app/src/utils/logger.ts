import { LogFormatter, Logger } from '@aws-lambda-powertools/logger';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { UnformattedAttributes, LogAttributes } from '@aws-lambda-powertools/logger/lib/types';

const logLevels: any = {
  dev  :   'debug',
  qa   :   'debug',
  uat  : 'verbose',
  prod :    'info',
};
const environment: string = process.env.ENV || 'dev';

class CustomLogFormatter extends LogFormatter {
  formatAttributes(attributes: UnformattedAttributes): LogAttributes {
    return {
      message: attributes.message,
      xRayTraceId: attributes.xRayTraceId || '?',
      loggerName: attributes.lambdaContext?.functionName,
      service: attributes.serviceName,
      timestamp: this.formatTimestamp(attributes.timestamp),
      level: attributes.logLevel.toLowerCase(),
      env: attributes.environment,
      serviceVersion: attributes.lambdaContext?.functionVersion,
      functionInfo: {
        memoryLimitInMB: attributes.lambdaContext?.memoryLimitInMB,
        coldStart: attributes.lambdaContext?.coldStart
      },
      requestId: attributes.lambdaContext?.awsRequestId
    };
  }

  formatTimestamp(now: Date): string {
    return now.toISOString();
  }
}

const logger = new Logger({
  logLevel: process.env.LOG_LEVEL || logLevels[environment],
  logFormatter: new CustomLogFormatter(),
  environment
});

const tracer = new Tracer({});

export { logger, tracer };
