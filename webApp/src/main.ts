import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import getLogger, { LogLevel } from './game/core/Logger/Logger';

const logger = getLogger(ngDevMode ? LogLevel.DEBUG : LogLevel.ERROR);

bootstrapApplication(App, appConfig)
  .catch((err) => logger.logCritical(err));
