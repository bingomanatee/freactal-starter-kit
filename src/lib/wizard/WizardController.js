/* eslint-disable func-names,object-shorthand */
import cp, { Validator } from 'class-propper';
import _ from 'lodash';
import EventEmitter from 'eventemitter3';

export default (bottle) => {
  bottle.factory('WizardController', ({
    WizardControllerPanel,
  }) => {
    const orderValidator = new Validator([
      new Validator('integer', 'order must be an integer'),
      new Validator(s => s < -1, 'order must be >= -1'),
    ]);

    class WizardController extends EventEmitter {
      constructor(config = {}) {
        super();
        let panels;
        if (config.panels) {
          panels = config.panels;
          delete config.panels;
        }
        Object.assign(this, config);
        if (panels) {
          panels.forEach(panel => this._initPanel(panel));
          this.panels = panels;
        }
      }

      addPanel(config) {
        let panel = config;
        if (!(panel instanceof WizardControllerPanel)) {
          panel = new WizardControllerPanel(config, this);
        }
        this._initPanel(panel);
        this.panels = this.panels.concat([panel]);
        return this;
      }

      addPanelAt(order, config) {
        try {
          orderValidator.try(order);
        } catch (err) {
          console.log('bad order: ', order);
          return;
        }
        const panel = new WizardControllerPanel(config, this);
        this._initPanel(panel);
        const newPanels = this.panels.slice(0);
        newPanels.splice(order + 1, 0, panel);
        this.panels = _.compact(newPanels);
      }

      _initPanel(panel) {
        panel.controller = this;
      }

      nextPage() {
        this.nextPanel();
      }

      nextPanel() {
        this.index = this.index + 1;
      }

      get panelErrors() {
        const errors = _(this.panels)
          .map('propErrors')
          .compact()
          .value();

        const sameTitles = _(this.panels)
          .map('title')
          .compact()
          .groupBy(_.identity)
          .values()
          .filter(set => set.length > 1)
          .map(set => set[0])
          .value();

        const sameFileNames = _(this.panels)
          .map('fileName')
          .compact()
          .groupBy(_.identity)
          .values()
          .filter(set => set.length > 1)
          .map(set => set[0])
          .value();

        if (sameTitles.length) {
          errors.push({
            prop: 'panels',
            value: sameTitles.join(','),
            error: `Duplicate titles: ${sameTitles.map(t => `"${t}"`).join(', ')}`,

          });
        }
        if (sameFileNames.length) {
          errors.push({
            prop: 'panels',
            value: sameFileNames.join(','),
            error: `Duplicate fileNames: ${sameFileNames.map(t => `"${t}"`).join(', ')}`,

          });
        }

        return errors || [];
      }

      get panelIsValid() {
        return this.panelErrors.length < 1;
      }

      get errors() {
        const out = this.propErrors || [];
        return _.compact(out.concat(this.panelErrors));
      }

      toJSON() {
        return {
          title: this.title,
          fileName: this.fileName,
          panels: this.panels.map((panel) => {
            if (!panel.toJSON) {
              console.log('bad panel:', panel);
              return null;
            }
            return panel.toJSON();
          }),
        };
      }
    }

    WizardController.fromJSON = (data) => {
      let panels;
      if (data.panels) {
        panels = data.panels;
        delete data.panels;
      }
      const controller = new WizardController(data);
      if (panels && Array.isArray(panels)) {
        panels.forEach((panel) => {
          controller.addPanel(WizardControllerPanel.fromJSON(panel, controller));
        });
      }
      return controller;
    };

    const propper = cp(WizardController);
    propper.addIsValid();

    propper.addProp('panels', {
      type: 'array',
      defaultValue: () => [],
      onChange: function (panels) {
        if (panels && Array.isArray) {
          panels.forEach((panel) => {
            this._initPanel(panel);
          });
        }
      },
    })
      .addString('fileName', {
        required: true,
        onBadData: function (field, value, err) {
          console.log('bad field:', value, err);
          return true;
        },
      })
      .addString('title', {
        required: true,
        onBadData: function (field, value, err) {
          console.log('bad title', value, err);
          return true;
        },
      })
      .addProp('index', {
        type: 'integer',
        defaultValue: 0,
        onChange: function (value, oldValue) {
          console.log('index changed: ', value, oldValue);
          if (value !== oldValue) {
            this.emit('index changed', { value, oldValue });
          }
        },
      })
      .addString('panelClass', {
        defaultValue: 'wizardPanel',
      })
      .addString('mainClass', {
        defaultValue: 'wizard',
      });


    return WizardController;
  });
};
