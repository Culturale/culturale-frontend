import { makeObservable, observable } from 'mobx';

import type { IChat } from '../chat';
import type { IUser } from '../user';

import type { IEvent } from './event.interface';

export type EventProps = {
  id?: string;
  codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari: string;
  adress: string;
  url: string;
  chat?: IChat;
  lat: number;
  long: number;
  photo: string;
  participants?: IUser[];
};

export class Event implements IEvent {
  public id: string;
  public codi: number;
  public denominacio: string;
  public descripcio: string;
  public dataIni: Date;
  public dataFi: Date;
  public horari: string;
  public adress: string;
  public url: string;
  public lat: number;
  public long: number;
  public photo: string;
  public chat: IChat;
  public participants: IUser[];

  constructor(props: EventProps) {
    const {
      id,
      codi,
      denominacio,
      descripcio,
      dataIni,
      dataFi,
      horari,
      adress,
      lat,
      long,
      photo,
      url,
      chat,
      participants,
    } = props;
    this.id = id;
    this.codi = codi;
    this.denominacio = denominacio;
    this.descripcio = descripcio;
    this.dataIni = dataIni;
    this.dataFi = dataFi;
    this.horari = horari;
    this.adress = adress;
    this.url = url;
    this.photo = photo;
    this.lat = lat;
    this.long = long;
    this.chat = chat;
    this.participants = participants || [];

    makeObservable(this, {
      adress: observable,
      chat: observable,
      codi: observable,
      dataFi: observable,
      dataIni: observable,
      denominacio: observable,
      descripcio: observable,
      horari: observable,
      lat: observable,
      long: observable,
      participants: observable,
      photo: observable,
      url: observable,
    });
  }

  public updateParticipant(newParticipant: IUser): void {
    const newParticipants = [...this.participants, newParticipant];
    this.participants = newParticipants;
  }

  public get participantsUsernames(): string[] {
    const ids = this.participants.map((participant) => participant.username);
    return ids;
  }
}
