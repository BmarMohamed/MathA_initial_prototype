import Background from "../background/background.cls.js";
import AxesMap from "../axes_map/axes_map.cls.js";
import GraphParameters from "./graph.params.js";

class Graph {
    constructor(params : GraphParameters, axes_map : AxesMap) {
        this.self_id = Graph.id++;
        this.params = new GraphParameters(params);
        this.background = axes_map.background;
        this.axes_map = axes_map;
        this.html = document.createElement('canvas');
        this.setup();
    }
    private static id : number = 0;
    public self_id : number;
    public params : GraphParameters;
    public background : Background;
    public axes_map : AxesMap;
    public html : HTMLCanvasElement;

    private setup() {
        this.html.id =`graph:${this.self_id}`;
        this.html.width = this.background.params.width!;
        this.html.height = this.background.params.height!;
        this.html.style.position = 'absolute';
        this.html.style.zIndex = '4';
        const ctx = this.html.getContext('2d')!;
        this.draw(ctx);
    }

    private draw(ctx : CanvasRenderingContext2D) {
        const origin = this.axes_map.getOrigin();
        this.params.domains!.forEach(domain => this.drawGraphInDomain(origin, domain, ctx))
    }

    private drawGraphInDomain(origin : [number, number], domain : [number, number], ctx : CanvasRenderingContext2D) {
        let pointes = Graph.getPointes(this, domain, origin, this.params.step!);
        ctx.strokeStyle = this.params.color!;
        ctx.lineWidth = this.params.line_width!;
        for(let i = 0; i < pointes.length - 1; i++) {
            ctx.beginPath();
            ctx.moveTo(pointes[i][0], pointes[i][1]);
            ctx.lineTo(pointes[i + 1][0], pointes[i + 1][1]);
            ctx.stroke();
        }
    }

    public static getPointes(graph : Graph, domain : [number, number], origin : [number, number], step : number) : Array<[number, number]> {
        const pointes : Array<[number, number]> = [];
        for(let i = domain[0]; i <= domain[1]; i += step) pointes.push([...graph.getPoint(i, graph.params.expression!(i), origin)]);
        return pointes;
    }

    private getPoint(x : number, y : number, origin : [number, number]) : [number, number] {
        return [
            (this.background.params.width! / this.axes_map.params.x_units! * x) + origin[0],
            -(this.background.params.height! / this.axes_map.params.y_units! * y) + origin[1]
        ]
    }

    public render() {
        this.background.html.appendChild(this.html);
        return this;
    }
}

export default Graph;