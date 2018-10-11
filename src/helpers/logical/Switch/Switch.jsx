import { Component } from 'react';
import { injectState } from 'freactal';

export default class Switch extends Component {
  render() {
    let {
      index, subject, children, all,
    } = this.props;
    if (!Array.isArray(children)) {
      children = [children];
    }

    /*    console.log('------------ rendering switch: ');
    console.log('children: ', children.map(c => c.props)); */
    if (index) {
      const out = children[index] || null;
      return out;
    }

    const g = (props, child, breakAt) => {
      let out = props;
      let { all: getAll, values, stop } = props;

      if (stop) {
        out = props;
      } else {
        if (getAll) {
        //  console.log('all: ', values, child);
          values.push(child);
        } else {
          values = [child];
        }

        out = Object.assign({}, props, { values, stop: breakAt || (!getAll) });
      }

      return out;
    };

    const tests = [
      ['test', (s, value) => {
        // console.log('test: ', value);
        // console.log('--input: ', s);
        // console.log('--result: ', value(s));
        return value(s);
      }],
      ['istrue', (s) => !!s],
      ['is', (s, value) => s === value],
      ['gt', (s, value) => s > value],
      ['lt', (s, value) => s < value],
      ['gte', (s, value) => s >= value],
      ['lte', (s, value) => s <= value],
      ['not', (s, value) => s !== value],
      ['in', (s, value) => value.indexOf(s) !== -1],
      ['notin', (s, value) => value.indexOf(s) === -1],
    ];

    const result = children.reduce((props, child) => {
      try {
        const { values, stop } = props;
        const hasValues = values.length > 0;
        if (stop) {
          return props;
        }
        if (!('props' in child)) return props;
        const breakAt = child.props.break;

        if ('else' in child.props) {
          let out = props;
          if (hasValues) {
            out = Object.assign({}, props, { stop: true });
          } else out = Object.assign({}, props, { values: [child], stop: true });
          return out;
        }

        const found = false;

        for (let i = 0; i < tests.length && !found; ++i) {
          const [prop, test] = tests[i];
          if (prop in child.props) {
            const value = child.props[prop];
            if (test(subject, value)) {
              // console.log('passed test', prop, 'v=', value, 'breakAt=', breakAt);
              return g(props, child, breakAt);
            }
          }
        }
      } catch (err) {
        console.log('error in Switch: ', props, err.message);
      }
      return props;
    }, {
      stop: false,
      all,
      values: [],
    });

    switch (result.values.length) {
      case 0:
        return null;
        break;

      case 1:
        return result.values[0];
        break;

      default:
        return <div>{result.values}</div>;
    }
  }
}
