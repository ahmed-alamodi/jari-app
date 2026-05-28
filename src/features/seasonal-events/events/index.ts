import { SeasonalEvent } from '../types';
import { arafahEvents } from './arafah';
import { ramadanEvents } from './ramadan';
import { fridayEvents } from './friday';
import { eidEvents } from './eid';
import { ashuraEvents } from './ashura';
import { whiteDaysEvents } from './white-days';
import { mondayThursdayEvents } from './monday-thursday';
import { islamicHolidaysEvents } from './islamic-holidays';

export const ALL_SEASONAL_EVENTS: SeasonalEvent[] = [
  ...arafahEvents,
  ...ramadanEvents,
  ...fridayEvents,
  ...eidEvents,
  ...ashuraEvents,
  ...whiteDaysEvents,
  ...mondayThursdayEvents,
  ...islamicHolidaysEvents
];

export * from './arafah';
export * from './ramadan';
export * from './friday';
export * from './eid';
export * from './ashura';
export * from './white-days';
export * from './monday-thursday';
export * from './islamic-holidays';
