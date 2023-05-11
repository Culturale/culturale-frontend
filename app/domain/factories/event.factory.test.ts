import { eventFactory } from '~/domain/factories';
import { EventDocument } from '~/infrastructure';

describe('Event Factory', () => {
  it('should create a new Event instance with correct attributes', () => {
    const json: EventDocument = require('./event.json');

    const event = eventFactory(json);

    expect(event).toMatchSnapshot();
  });
});
