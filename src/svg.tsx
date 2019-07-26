/**
 * @author WMXPY
 * @namespace Svg
 * @description Svg
 */

import * as React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Polygon, Text } from 'react-native-svg';

export type Tag = "svg" | "polygon" | "text" | "g" | "defs" | "clipPath" | "circle";

export type JsonStructure = {

    readonly tag: Tag;
    readonly attributes: Record<string, string>;
    readonly children: Array<string | JsonStructure>;
};

export type ImageTileProps = {

    readonly json: JsonStructure;
};

export class JsonBuilder extends React.PureComponent<ImageTileProps> {

    public render() {

        const current: JsonStructure = this.props.json;
        const children = current.children.map(this._renderChildren);

        switch (current.tag) {

            case 'svg':
                return (<Svg {...current.attributes as any} height={70} width={70}>{children}</Svg>);
            case 'polygon':
                return (<Polygon {...current.attributes as any}>{children}</Polygon>);
            case 'text':
                return (<Text {...current.attributes as any}>{children}</Text>);
            case 'g':
                return (<G {...current.attributes as any}>{children}</G>);
            case 'defs':
                return (<Defs {...current.attributes as any}>{children}</Defs>);
            case 'clipPath':
                return (<ClipPath {...current.attributes as any}>{children}</ClipPath>);
            case 'circle':
                return (<Circle {...current.attributes as any}>{children}</Circle>);
        }
        return null;
    }

    private _renderChildren(value: string | JsonStructure, index: number) {

        if (typeof value === 'string') {
            return value;
        } else {
            return <JsonBuilder key={index} json={value} />;
        }
    }
}
