# react-chart

Hi, this is the Chart component.
It takes some data and use it to plot few lines on a canvas.

Add dependencies to your project, nothing special:

`yarn add react-chart`

And then just import and use it (or it's parts).

```js
import { Chart } from 'react-chart';

...

const props = {
    lineNames: string[], // the line titles
    xLabels: string[], // the x-axis labels
    colors: string[], // the line colors
    values: number[][], // the lines data
    canvas: {
        width: number,
        height: number,
        lineWidth: number,
    }
}

...

<Chart {...props} />
```

Check the [`example`](example) folder for more details.
