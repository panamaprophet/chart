import { ReactElement, PureComponent, Children } from 'react';


export class Line extends PureComponent<{
    label: string,
    color: string,
}, unknown> {}

export class AxisX extends PureComponent<{
    labels?: string[],
}, unknown> {}

export class AxisY extends PureComponent<{[k: string]: never}, unknown> {}

export class Zoom extends PureComponent<{[k: string]: never}, unknown> {}

export class Tooltips extends PureComponent<{
    formatLabel: (value: number, line: string) => string | number,
}, unknown> {}


export const getDefaultSettings = () => ({
    lines: [],
    axisX: { labels: [] },
    axisY: {},
    tooltips: { formatLabel: (value: number) => value },
    zoom: null,
});

// @todo: revisit
export const getSettings = (children: JSX.Element|JSX.Element[] = []) => {
    const settings = Children.toArray(children);

    if (settings.length === 0) {
        return getDefaultSettings();
    }

    const lines = settings
        .filter(child => (child as ReactElement).type === Line)
        .map(line => (line as Line).props);

    const axisX = (settings.find(child => (child as ReactElement).type === AxisX) as AxisX)?.props;
    const axisY = (settings.find(child => (child as ReactElement).type === AxisY) as AxisY)?.props;
    const tooltips = (settings.find(child => (child as ReactElement).type === Tooltips) as Tooltips)?.props;
    const zoom = (settings.find(child => (child as ReactElement).type === Zoom) as Zoom)?.props;

    return {
        lines,
        axisX,
        axisY,
        tooltips,
        zoom,
    };
};
