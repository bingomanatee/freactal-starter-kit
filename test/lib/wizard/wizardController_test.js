import EventEmitter from 'eventemitter3';
import util from 'util';

import bottle from './../../../src/lib/bottle';
import WIZARD_CONTROLLER_JSON from './WizardController.json';

describe('wizard', () => {
  let WizardController;

  beforeEach(() => {
    const b = bottle();
    WizardController = b.WizardController;
  });

  describe('WizardController', () => {
    describe('constructor', () => {
      it('should reflect title', () => {
        const w = new WizardController({ title: 'foo', fileName: 'controllers/Foo' });
        expect(w.title).toEqual('foo');
        expect(w.fileName).toEqual('controllers/Foo');
      });
      it.skip('should reflect panels', () => {
        const w = new WizardController('foo', {
          title: 'foo',
          fileName: 'controllers/Foo',
          panels: [
            new EventEmitter(),
            new EventEmitter(),
            new EventEmitter(),
          ],
        });
        expect(w.panels[0].controller).toEqual(w);
        expect(w.panels[2].controller).toEqual(w);
      });
    });

    describe('addPanel', () => {
      it('should add a series of panels', () => {
        const w = new WizardController({
          title: 'foo', fileName: 'controllers/Foo',
        });
        w.addPanel({ title: 'alpha', fileName: 'Alpha' })
          .addPanel({ title: 'beta', fileName: 'Beta' })
          .addPanel({ title: 'gamma', fileName: 'Gamma' });

        expect(w.panels.length).toEqual(3);
        expect(w.panels[0].title).toEqual('alpha');
        expect(w.panels[0].controller).toEqual(w);
        expect(w.panels[0].order).toEqual(0);
        expect(w.panels[1].title).toEqual('beta');
        expect(w.panels[1].controller).toEqual(w);
        expect(w.panels[1].order).toEqual(1);
        expect(w.panels[2].title).toEqual('gamma');
        expect(w.panels[2].controller).toEqual(w);
        expect(w.panels[2].order).toEqual(2);
      });
    });

    describe('add field', () => {
      it('should add a series of panels', () => {
        const w = new WizardController({
          title: 'foo', fileName: 'controllers/Foo',
        });
        w.addPanel({ title: 'alpha', fileName: 'Alpha' })
          .addPanel({ title: 'beta', fileName: 'Beta' })
          .addPanel({ title: 'gamma', fileName: 'Gamma' });
        w.panels[0].addField('foo', 'date');
        w.panels[0].addField('bar', 'integer');

        expect(w.panels[0].fields[0].name).toEqual('foo');
        expect(w.panels[0].fields[0].type).toEqual('date');
        expect(w.panels[0].fields[1].name).toEqual('bar');
        expect(w.panels[0].fields[1].type).toEqual('integer');
      });
    });

    describe('toJSON', () => {
      it('should add a series of panels', () => {
        const w = new WizardController({ title: 'foo', fileName: 'controllers/Foo' });
        w.addPanel({ title: 'alpha', fileName: 'Alpha' })
          .addPanel({ title: 'beta', fileName: 'Beta' })
          .addPanel({ title: 'gamma', fileName: 'Gamma' });
        w.panels[0].addField('foo', 'date');
        w.panels[0].addField('bar', 'integer');
        w.panels[1].addField('vey', 'date');
        w.panels[1].addField('delta', 'integer');

        expect(w.toJSON()).toEqual(WIZARD_CONTROLLER_JSON);
      });
    });

    describe('WCfromJSON', () => {
      it('should add a series of panels', () => {
        const w = new WizardController({ title: 'foo', fileName: 'controllers/Foo' });
        w.addPanel({ title: 'alpha', fileName: 'Alpha' })
          .addPanel({ title: 'beta', fileName: 'Beta' })
          .addPanel({ title: 'gamma', fileName: 'Gamma' });
        w.panels[0].addField('foo', 'date');
        w.panels[0].addField('bar', 'integer');
        w.panels[1].addField('vey', 'date');
        w.panels[1].addField('delta', 'integer');

        const newW = WizardController.fromJSON(w.toJSON());

        expect(newW.toJSON()).toEqual(WIZARD_CONTROLLER_JSON);
      });
    });
  });
});
