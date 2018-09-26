import React from 'react';
import { render } from 'react-dom';
import { Map } from 'immutable';

import whyDidYouUpdate from '../../src';

whyDidYouUpdate(React);

class ClassDemo extends React.Component {
  render() {
    return <div>test2</div>;
  }
}

render(
  <ClassDemo
    a={1}
    b={{ c: { d: 4 } }}
    e={function something() {}}
    f={1}
    g={new Map()}
  />,
  document.querySelector('#demo')
);

render(
  <ClassDemo
    a={1}
    b={{ c: { d: 4 } }}
    e={function something() {}}
    f={1}
    g={new Map()}
  />,
  document.querySelector('#demo')
);
