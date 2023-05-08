// import { Types } from 'mongoose';

// import type { IChat } from '~/domain/entities/chat/chat.interface';
import type { CreateEventDto } from '~/infrastructure';

import { Event } from './event';
import type { IEvent } from './event.interface';


describe('Event Entity', function () {
  let instance: IEvent;

  const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1234);

  beforeEach(function () {
    const time = Date.now();
    const date = new Date(time);
    const eventProps: CreateEventDto  = {adress: 'test-adress', codi: 20211006023 , dataFi: date, dataIni: date, denominacio: 'test-denominacio', descripcio: 'test-descripcio', horari: '2h', url: 'test-adress'};
    instance = new Event(
      eventProps,
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
    dateSpy.mockReset();
  });
});
