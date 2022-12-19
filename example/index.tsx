import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InbizImageSearchScreenshot } from '../.';
import '../src/index.less';

const App = () => {
  return (
    <div>
      <InbizImageSearchScreenshot />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));