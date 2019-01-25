import {ReportsEffects} from './reports.effects';
import {SuppliersEffects} from './suppliers.effects';
import { DownloadsEffects } from './downloads.effects';

export const effects: any[] = [ReportsEffects, SuppliersEffects, DownloadsEffects];

export * from './reports.effects';
export * from './suppliers.effects';
export * from './downloads.effects';
