# React-chart

Hi, this is the Chart component.
It takes some data and use it to plot few lines on a canvas.

Add dependencies to your project, nothing special:

`yarn add @evergreenstash/react-chart`

And then just import and use it (or it's parts).

```js
import { Chart } from '@evergreenstash/react-chart';

...

const values = [
    data.map(item => item.temperature),
    data.map(item => item.humidity),
];

const dates = data.map(item => item.date);

...

<Chart values={values}>
    <Line label="temperature" color="#73A921" />
    <Line label="humidity" color="#487AFA" />

    <AxisX labels={dates} />
    <AxisY />

    <Zoom />

    <Tooltips />
</Chart>
```

Check the [`example`](example) folder for more details.
