import type { IEvent, EventProps } from '~/domain/entities';
import { Event } from '~/domain/entities';


export function eventFactory(json: any): IEvent {
  const props: EventProps = {
    id: json.id,
    codi: json.codi,
    denominacio: json.denominacio,
    descripcio: json.descripcio,
    dataIni: new Date(json.dataIni),
    dataFi: new Date(json.dataFi),
    horari: json.horari,
    adress: json.adress,
    url: json.url,
    chat: json.chat,
    participants: json.participants,
  };
  return new Event(props);
}