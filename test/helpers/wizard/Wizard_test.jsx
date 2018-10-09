import { mount, shallow } from '../../enzyme';

import Wizard from '../../../src/helpers/wizard/Wizard';

describe('wizard', () => {
  describe('Wizard', () => {
    it('should render the title of the wizard', () => {
      const Footer = ({ wizard }) => (
        <div>
          <button onClick={() => wizard.nextPage()}>
            Next
          </button>
        </div>
      );
      const content = (
        <Wizard title="Main Title" footer={Footer}>
          <div title="First Panel">
            <p>First Panel content</p>
          </div>
          <div title="Second Panel">
            <p>Second panel content</p>
          </div>
          <div title="Third Panel" />
        </Wizard>
      );

      const wrap = mount(content);


      expect(wrap.find('h2').text()).toEqual('Main Title');
      expect(wrap.find('h3').text()).toEqual('First Panel');
      wrap.find('button').simulate('click');
      expect(wrap.find('h3').text()).toEqual('Second Panel');
    });
  });
});
