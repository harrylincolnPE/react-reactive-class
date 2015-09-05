import React from 'react';
import {dom, reactive} from 'react-reactive-class';
import Rx from 'rx';

const {div:Xdiv, input:Xinput} = dom;

function toProp(name) {
  return function(v) {
    const props = {};
    props[name] = v;
    return props;
  };
}

class App extends React.Component {
  render() {
    console.log('App rendered.');

    const inputEv$ = new Rx.Subject();
    const inputValue$ = inputEv$.map(e => e.target.value);

    return (
      <div>
        <Xinput ee={inputValue$.map(toProp('value'))}
                value={this.props.text}
                onChange={inputEv$.onNext.bind(inputEv$)} />

        <Xdiv ee={inputValue$.map(toProp('children'))}>{this.props.text}</Xdiv>
      </div>
    );
  }
}

React.render(<App text="type something" />, document.getElementById('app'));
