import React from 'react';
import { render } from 'react-dom';
import { Chart } from '../src';

import mock from './mock.json';


const App = () => {
    const props = {
        xLabels: mock.map(item => item.date),
        lineNames: [
            'temperature',
            'humidity',
        ],
        values: [
            mock.map(item => item.temperature),
            mock.map(item => item.humidity),
        ],
        colors: [
            '#73A921',
            '#487AFA',
        ],
    };

    return <Chart {...props} />;
};


render(<App />, document.getElementById('root'));
