/**
 * @author WMXPY
 * @namespace SVG
 * @description Svg
 */

import React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Polygon, Text } from 'react-native-svg';

export type Tag = "svg" | "polygon" | "text" | "g" | "defs" | "clipPath" | "circle";

export type JsonStructure = {

    readonly tag: Tag;
    readonly attributes: Record<string, string>;
    readonly children: Array<string | JsonStructure>;
};

export type SvgJsonProps = {

    readonly json: JsonStructure;
};

export class SvgJson extends React.PureComponent<SvgJsonProps> {

    public render() {

        const current: JsonStructure = this.props.json;
        switch (current.tag) {
            case 'svg':
                return (<Svg {...current.attributes as any} height={70} width={70}>{current.children.map(this._renderChildren)}</Svg>);
            case 'polygon':
                return (<Polygon {...current.attributes as any}></Polygon>);
            case 'text':
                return (<Text {...current.attributes as any}>{current.children.map(this._renderChildren)}</Text>);
            case 'g':
                return (<G {...current.attributes as any}>{current.children.map(this._renderChildren)}</G>);
            case 'defs':
                return (<Defs {...current.attributes as any}>{current.children.map(this._renderChildren)}</Defs>);
            case 'clipPath':
                return (<ClipPath {...current.attributes as any}>{current.children.map(this._renderChildren)}</ClipPath>);
            case 'circle':
                return (<Circle {...current.attributes as any}>{current.children.map(this._renderChildren)}</Circle>);
        }
        return null;
    }

    private _renderChildren(value: string | JsonStructure, index: number) {

        if (typeof value === 'string') {
            return value;
        } else {
            return <SvgJson key={index} json={value} />;
        }
    }
}
