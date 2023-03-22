import Background from "../background/background.cls.js";
import AxesMap from "../axes_map/axes_map.cls.js";
import Graph from "../graphs/graph.cls.js";
import IntegralParameters from "./integral.params.js";

/* TODO FIX DYNAMIC PATHES + GEERA WITH GRAPHS */

class Integral {
    constructor(params : IntegralParameters, graph1 : Graph, graph2 : Graph) {
        this.self_id = Integral.id++;
        this.params = new IntegralParameters(params);
        this.background = graph1.axes_map.background;
        this.axes_map = graph1.axes_map;
        this.graph1 = graph1;
        this.graph2 = graph2;
        this.html = document.createElement('canvas');
        this.setup();
    }
    private static id : number = 0;
    public self_id : number;
    public params : IntegralParameters;
    public background : Background;
    public axes_map : AxesMap;
    public graph1 : Graph;
    public graph2 : Graph;
    public html : HTMLCanvasElement;

    private setup() {
        this.html.id =`integral:${this.self_id}`;
        this.html.width = this.background.params.width!;
        this.html.height = this.background.params.height!;
        this.html.style.position = 'absolute';
        this.html.style.zIndex = '3';
        const ctx = this.html.getContext('2d')!;
        this.integrate(ctx)
    }

    private integrate(ctx : CanvasRenderingContext2D) {
        const pathes = this.getPathes();
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.4;
        for(let i = 0; i < pathes.length - 1; i++) {
            if(pathes[i + 1][1][1] > pathes[i + 1][0][1]) ctx.fillStyle = this.graph1.params.color!;
            else ctx.fillStyle = this.graph2.params.color!;
            ctx.beginPath();
            ctx.moveTo(pathes[i][0][0], pathes[i][0][1])
            ctx.lineTo(pathes[i][1][0], pathes[i][1][1])
            ctx.lineTo(pathes[i + 1][1][0], pathes[i + 1][1][1])
            ctx.lineTo(pathes[i + 1][0][0], pathes[i + 1][0][1])
            ctx.fill();
        }
    }

    private getPathes() {
        const pathes = [];
        const origin = this.graph1.getOrigin();
        const graph1_points = this.graph1.getPointes(this.params.domains![0], origin);
        const graph2_points = this.graph2.getPointes(this.params.domains![0], origin);
        for(let i = 0; i < graph1_points.length - 1; i++) {
            pathes.push([
                graph1_points[i],
                graph2_points[i],
                graph1_points[i + 1],
                graph2_points[i + 1],
            ])
        }
        return pathes;
    }

    public render() {
        this.background.html.appendChild(this.html);
        return this;
    }
}

export default Integral;