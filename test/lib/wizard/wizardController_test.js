import WizardController from './../../../src/lib/wizard/WizardController';

describe('wizard', () => {
  describe('WizardController', () => {
    describe('constructor', () => {
      it('should reflect title', () => {
        const w = new WizardController('foo', {});
        expect(w.title).toEqual('foo');
      });
      it('should reflect panels', () => {
        const w = new WizardController('foo', {
          panels: [
            {},
            {},
            {},
          ],
        });
        expect(w.panels[0].controller).toEqual(w);
        expect(w.panels[2].controller).toEqual(w);
      });
    });

    describe('addPanel', () => {
      it('should add a series of panels', () => {
        const w = new WizardController('foo');
        w.addPanel('alpha')
          .addPanel('beta')
          .addPanel('gamma');

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
  });
});
