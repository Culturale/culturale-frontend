import type { IStop} from '~/domain/entities';
import { Stop } from '~/domain/entities';
import type { definitions } from '~/infrastructure/api/schema';

export function stopFactory(data: definitions['stop']): IStop {
  const stopId = data.stop_id;

  return new Stop(stopId);
}
