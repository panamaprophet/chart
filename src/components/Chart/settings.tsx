import { ReactElement, PureComponent, Children, JSXElementConstructor, ComponentProps } from 'react';


export class Line extends PureComponent<{
    label: string,
    color: string,
}, unknown> {}

export class AxisX extends PureComponent<{
    labels?: string[],
}, unknown> {}

export class AxisY extends PureComponent<{ [k: string]: never }, unknown> {}

export class Zoom extends PureComponent<{ [k: string]: never }, unknown> {}

export class Tooltips extends PureComponent<{
    formatLabel: (value: number, line: string) => string | number,
}, unknown> {}


export interface Settings {
    lines: ComponentProps<typeof Line>[],
    axisX: ComponentProps<typeof AxisX>,
    axisY: ComponentProps<typeof AxisY>,
    tooltips: ComponentProps<typeof Tooltips>,
    zoom: ComponentProps<typeof Zoom>,
}


const isComponent = <T,>(Component: JSXElementConstructor<T>) => (child: ReactElement) => child.type === Component;

const getProps = (element?: JSX.Element) => element?.props ?? null;


export const getSettings = (children: JSX.Element | JSX.Element[] = []): Partial<Settings> => {
    if (Children.count(children) === 0) {
        return {};
    }

    const settings = Children.toArray(children) as ReactElement[];

    return {
        lines: settings.filter(isComponent(Line)).map(getProps),
        axisX: getProps(settings.find(isComponent(AxisX))),
        axisY: getProps(settings.find(isComponent(AxisY))),
        tooltips: getProps(settings.find(isComponent(Tooltips))),
        zoom: getProps(settings.find(isComponent(Zoom))),
    };
};
