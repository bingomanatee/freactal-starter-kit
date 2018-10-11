/* eslint-disable react/jsx-indent */
import Switch, { Case } from '../../../src/helpers/logical/Switch';
import { mount } from '../../enzyme';

describe('logical', () => {
  describe('Switch', () => {
    describe('text nodes', () => {
      describe('index picking', () => {
        it('should choose an element', () => {
          const content = (
            <Switch index={1}>
              <Case>0</Case>
              <Case>1</Case>
              <Case>2</Case>
              <Case>3</Case>
            </Switch>
          );
          const component = mount(content);

          expect(component.text()).toEqual('1');
        });
      });

      describe('subject picking', () => {
        describe('equality', () => {
          const content = subject => (
            <Switch subject={subject}>
              <Case is="alpha">0</Case>
              <Case is="beta">1</Case>
              <Case is="gamma">2</Case>
              <Case is="delta">3</Case>
              <Case else>4</Case>
            </Switch>
          );
          it('should find element based on subject', () => {
            const component = mount(content('gamma'));
            expect(component.text()).toEqual('2');
          });

          it('should choose else if no subject match', () => {
            const component = mount(content('aleph'));
            expect(component.text()).toEqual('4');
          });
        });
        describe('test', () => {
          const content = (subject, all = false) => (
            <Switch subject={subject} all={all}>
              <Case test={n => isNaN(n)} break>NaN</Case>
              <Case test={n => n > 0}>pos</Case>
              <Case test={n => n < 0}>neg</Case>
              <Case is={0}>0</Case>
              <Case test={n => !(Math.abs(n) % 2)}>even</Case>
              <Case test={n => (Math.abs(n) % 2)}>odd</Case>
            </Switch>
          );

          it('finds a positive number based on value', () => {
            const component = mount(content(2));
            expect(component.text()).toEqual('pos');
          });

          it('finds a negative number based on value', () => {
            const component = mount(content(-2));
            expect(component.text()).toEqual('neg');
          });

          it('finds a 0 based on value', () => {
            const component = mount(content(0));
            expect(component.text()).toEqual('0');
          });

          it('breaks on non number', () => {
            const component = mount(content('a string'));
            expect(component.text()).toEqual('NaN');
          });

          describe('with all', () => {
            it('finds a positive even number based on value', () => {
              const component = mount(content(2, true));
              expect(component.text()).toEqual('poseven');
            });

            it('finds a negative number based on value', () => {
              const component = mount(content(-2, true));
              expect(component.text()).toEqual('negeven');
            });

            it('finds a 0 based on value', () => {
              const component = mount(content(0, true));
              expect(component.text()).toEqual('0even');
            });

            it('breaks on non number', () => {
              const component = mount(content('a string', true));
              expect(component.text()).toEqual('NaN');
            });
          });
        });
      });
    });

    describe('tag nodes', () => {
      describe('index picking', () => {
        it('should choose an element', () => {
          const content = (
            <Switch index={1}>
              <Case><p>0</p></Case>
              <Case><p>1</p></Case>
              <Case><p>2</p></Case>
              <Case><p>3</p></Case>
            </Switch>
          );
          const component = mount(content);

          expect(component.text()).toEqual('1');
        });
      });
    });
  });
});
