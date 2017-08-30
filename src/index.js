import React from 'react';
import { render } from 'react-dom';
import Root from './causalityredux/view/containers/Root';
import ReduxRoot from './redux/containers/Root';
import { useRedux } from './UseRedux';

if (useRedux) {
    render(
        <ReduxRoot />,
        document.getElementById('reactroot')
    );   
} else {
    render(
        <Root />,
        document.getElementById('reactroot')
    );
}