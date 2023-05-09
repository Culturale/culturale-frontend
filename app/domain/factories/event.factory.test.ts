import { Event } from '~/domain/entities';
import { eventFactory } from '~/domain/factories';

describe('eventFactory', () => {
  it('should create a new Event instance with correct atributes', () => {
    const json = {
      adress: '123 Main St, Anytown, USA',
      chat: 'test-chat',
      codi: 'ABC',
      dataFi: '2022-01-02T00:00:00.000Z',
      dataIni: '2022-01-01T00:00:00.000Z',
      denominacio: 'test-denominacio',
      descripcio: 'test-descripcio',
      horari: '9am - 5pm',
      id: '20211006023',
      participants: ['test-user1', 'test-user2'],
      url: 'test-url',
    };

    const event = eventFactory(json);

    expect(event).toBeInstanceOf(Event);
    expect(event.id).toEqual(json.id);
    expect(event.codi).toEqual(json.codi);
    expect(event.denominacio).toEqual(json.denominacio);
    expect(event.descripcio).toEqual(json.descripcio);
    expect(event.dataIni.toISOString()).toEqual(new Date(json.dataIni).toISOString());
    expect(event.dataFi.toISOString()).toEqual(new Date(json.dataFi).toISOString());
    expect(event.horari).toEqual(json.horari);
    expect(event.adress).toEqual(json.adress);
    expect(event.url).toEqual(json.url);
    expect(event.chat).toEqual(json.chat);
    expect(event.participants).toEqual(json.participants);
  });
});
