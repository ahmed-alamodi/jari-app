import { SeasonalEvent } from '../types';
import { arafahEvents } from './arafah';
import { ramadanEvents } from './ramadan';
import { fridayEvents } from './friday';
import { eidEvents } from './eid';
import { ashuraEvents } from './ashura';

export const ALL_SEASONAL_EVENTS: SeasonalEvent[] = [
  ...arafahEvents,
  ...ramadanEvents,
  ...fridayEvents,
  ...eidEvents,
  ...ashuraEvents
];

export * from './arafah';
export * from './ramadan';
export * from './friday';
export * from './eid';
export * from './ashura';
