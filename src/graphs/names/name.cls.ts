import AxesMap from "../axes_map/axes_map.cls.js";
import Graph from "../graphs/graph.cls.js";
import Integral from "../integrals/integral.cls.js";
import Line from "../lines/line.cls.js";
import Point from "../points/point.cls.js";
import Vector from "../vectors/vector.cls.js";
import NameParameters from "./name.params.js";

class Name {
    constructor(params : NameParameters, element : Graph | Integral | Line | Point | Vector, axes_map : AxesMap) {
        this.axes_map = axes_map;
        const ctx = element.html.getContext('2d')!;
        ctx.font = `${params.font_size}px sans-serif`;
        ctx.fillStyle = params.color!;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const position = this.getPosition(params.position![0], params.position![1]);
        ctx.fillText(params.text!, position[0], position[1]);
    }
    private axes_map : AxesMap;

    private getPosition(x : number, y : number) : [number, number] {
        const origin = this.axes_map.getOrigin();
        return [
            (this.axes_map.background.params.width! / this.axes_map.params.x_units! * x) + origin[0],
            -(this.axes_map.background.params.height! / this.axes_map.params.y_units! * y) + origin[1]
        ]
    }
}

export default Name;