import AxesMap from "../axes_map/axes_map.cls.js";
import Background from "../background/background.cls.js";
import Graph from "../graphs/graph.cls.js";
import LineParameters from "./line.params.js";


class Line {
    constructor(params : LineParameters, axes_map : AxesMap,) {
        this.self_id = Line.id++;
        this.params = new LineParameters(params);
        this.background = axes_map.background;
        this.axes_map = axes_map;
        this.html = document.createElement('canvas');
        this.setup();
    }
    private static id : number = 0;
    public self_id : number;
    public params : LineParameters;
    public background : Background;
    public axes_map : AxesMap;
    public html : HTMLCanvasElement;

    private setup() {
        this.html.id =`line:${this.self_id}`;
        this.html.width = this.background.params.width!;
        this.html.height = this.background.params.height!;
        this.html.style.position = 'absolute';
        this.html.style.zIndex = '5';
        const ctx = this.html.getContext('2d')!;
        this.draw(ctx);
    }

    private draw(ctx : CanvasRenderingContext2D) {
        ctx.strokeStyle = this.params.color!;
        ctx.lineWidth = this.params.line_width!;
        const points = this.getPoints();
        ctx.moveTo(points[0][0], points[0][1]);
        ctx.lineTo(points[1][0], points[1][1]);
        ctx.stroke();
    }     

    private getPoints() {
        let a = this.params.a;
        let b = this.params.b;
        return Graph.getPointes(
            new Graph(
                { expression : (x) => (a! * x) + b!}
                , this.axes_map
            ), this.params.domain!, 
            this.axes_map.getOrigin(), 
            this.params.domain![1] - 
            this.params.domain![0]
        )
    }

    public render() {
        this.background.html.appendChild(this.html);
        return this;
    }
}

export default Line;