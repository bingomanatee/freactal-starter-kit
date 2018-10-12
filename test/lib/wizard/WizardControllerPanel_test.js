import EventEmitter from 'eventemitter3';
import util from 'util';

import bottle from './../../../src/lib/bottle';

describe('wizard', () => {
  describe('WizardControllerPanel', () => {
    let WizardControllerPanel;

    beforeEach(() => {
      const b = bottle();
      WizardControllerPanel = b.WizardControllerPanel;
    });

    describe('.fromJSON', () => {
      it('should make a field', () => {
        const data = {
          id: 10,
          title: 'foo',
          fileName: 'Foo',
        };

        const field = WizardControllerPanel.fromJSON(data);
        expect(field.id).toEqual(10);
        expect(field.title).toEqual('foo');
        expect(field.fileName).toEqual('Foo');
      });
    });
    describe('#toJSON', () => {
      it('should make a field', () => {
        const data = {
          id: 10,
          title: 'foo',
          fileName: 'Foo',
        };

        const f = new WizardControllerPanel(data);
        const field = f.toJSON();
        expect(field.id).toEqual(10);
        expect(field.title).toEqual('foo');
        expect(field.fileName).toEqual('Foo');
      });
    });
  });
});
