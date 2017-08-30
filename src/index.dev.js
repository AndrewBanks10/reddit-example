import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './causalityredux/view/containers/Root';
import ReduxRoot from './redux/containers/Root';
import { useRedux } from './UseRedux';

//
// The below is the necessary technique to utilize hot re-loading of react.
// 
const renderRoot = (TheApp) => {
  render(
    <AppContainer>
      <TheApp/>
    </AppContainer>,
    document.getElementById('reactroot')
  );
};

if (useRedux) {

  // First module render.
  renderRoot(ReduxRoot);

  //
  // Hot reload support for react. If any of the react components change this will
  // hot reload all changed components and then re-render the root
  //
  if (module.hot) {
    module.hot.accept('./redux/containers/Root', () => {
      // The below requires the location of App or whatever is used for the root component
      // The require('./react-components/app') brings in a new copy of the App module.
      // react will handle keeping the props and state the same after the load. 
      renderRoot(require('./redux/containers/Root').default);
    });
  }
} else {
  // First module render.
  renderRoot(Root);
  
    //
    // Hot reload support for react. If any of the react components change this will
    // hot reload all changed components and then re-render the root
    //
    if (module.hot) {
      module.hot.accept('./causalityredux/view/containers/Root', () => {
        // The below requires the location of App or whatever is used for the root component
        // The require('./react-components/app') brings in a new copy of the App module.
        // react will handle keeping the props and state the same after the load. 
        renderRoot(require('./causalityredux/view/containers/Root').default);
      });
    }  
}  


