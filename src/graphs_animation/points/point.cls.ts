import AxesMap from "../axes_map/axes_map.cls.js";
import Background from "../background/background.cls.js";
import PointParameters from "./point.params.js";

class Point {
    constructor(params : PointParameters, axes_map : AxesMap) {
        this.self_id = Point.id++;
        this.params = new PointParameters(params);
        this.background = axes_map.background!;
        this.axes_map = axes_map;
        this.html = document.createElement('canvas');
        this.setup();
    }
    private static id : number = 0;
    public self_id : number;
    public params : PointParameters;
    public background : Background;
    public axes_map : AxesMap;
    public html : HTMLCanvasElement;

    private setup() {
        this.html.id =`point:${this.self_id}`;
        this.html.width = this.background.params.width!;
        this.html.height = this.background.params.height!;
        this.html.style.position = 'absolute';
        this.html.style.zIndex = '6';
        const ctx = this.html.getContext('2d')!;
        this.draw(ctx);
    }

    private draw(ctx : CanvasRenderingContext2D) {
        let point_position = this.getPosition(this.params.position![0], this.params.position![1], this.axes_map.getOrigin());
        ctx.fillStyle = this.params.color!;
        ctx.beginPath();
        ctx.arc(point_position[0], point_position[1], this.params.radius!, 0, 2 * Math.PI);
        ctx.fill()
    }

    private getPosition(x : number, y : number, origin : [number, number]) : [number, number] {
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

export default Point;