import EventEmitter from 'eventemitter3';
import util from 'util';

import bottle from './../../../src/lib/bottle';

describe('wizard', () => {
  describe('WCPField', () => {
    let WCPField;

    beforeEach(() => {
      const b = bottle();
      WCPField = b.WCPField;
    });

    describe('.fromJSON', () => {
      it('should make a field', () => {
        const data = {
          id: 10,
          name: 'foo',
          type: 'date',
        };

        const field = WCPField.fromJSON(data);
        expect(field.id).toEqual(10);
        expect(field.name).toEqual('foo');
        expect(field.type).toEqual('date');
      });
    });
    describe('#toJSON', () => {
      it('should make a field', () => {
        const data = {
          id: 10,
          name: 'foo',
          type: 'date',
        };

        const f = new WCPField(data);
        const field = f.toJSON();
        expect(field.id).toEqual(10);
        expect(field.name).toEqual('foo');
        expect(field.type).toEqual('date');
      });
    });
  });
});
