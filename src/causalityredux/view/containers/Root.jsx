import React from 'react';
import CausalityRedux from 'causality-redux';
import { Provider } from 'react-redux';
import AsyncApp from '../../controller/AsyncController';

const App = () =>
    <Provider store={CausalityRedux.store}>
        <AsyncApp />
    </Provider>;

export default App;
