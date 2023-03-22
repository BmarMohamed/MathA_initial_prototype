import VectorParameters from "./vector.param.js";
import Background from "../background/background.cls.js";
import AxesMap from "../axes_map/axes_map.cls.js";

class Vector {
    constructor(params : VectorParameters, axes_map : AxesMap) {
        this.self_id = Vector.id++;
        this.params = new VectorParameters(params);
        this.background = axes_map.background!;
        this.axes_map = axes_map;
        this.html = document.createElement('canvas');
        this.setup();
    }
    private static id : number = 0;
    public self_id : number;
    public params : VectorParameters;
    public background : Background;
    public axes_map : AxesMap;
    public html : HTMLCanvasElement;

    private setup() {
        this.html.id =`vector:${this.self_id}`;
        this.html.width = this.background.params.width!;
        this.html.height = this.background.params.height!;
        this.html.style.position = 'absolute';
        this.html.style.zIndex = '7';
        const ctx = this.html.getContext('2d')!;
        this.draw(ctx);
    }

    private draw(ctx : CanvasRenderingContext2D) {
        const from_to = this.getFromTo();
        ctx.strokeStyle = this.params.color!;
        ctx.lineWidth = this.params.line_width!;
        ctx.beginPath();
        ctx.moveTo(from_to[0] - (this.params.line_width! / 2), from_to[1]);
        ctx.lineTo(from_to[2] - (this.params.line_width! / 2), from_to[3]);
        ctx.stroke();
        this.drawHead(from_to, ctx);
    }

    private drawHead(from_to : [number, number, number, number], ctx : CanvasRenderingContext2D) {
        let points = this.getHeadPoints(from_to, ctx);
        ctx.fillStyle = this.params.color!;
        ctx.beginPath();
        ctx.moveTo(points[0], points[1]);
        ctx.lineTo(points[2], points[3]);
        ctx.lineTo(points[4], points[5]);
        ctx.fill();
    }

    private getHeadPoints(from_to : [number, number, number, number], ctx : CanvasRenderingContext2D) {
        const first_point = [
            from_to[2] - (this.params.line_width! / 2), 
            from_to[3],
        ];
        const slope = this.getSlope();
        const alpha = Math.atan(slope) - (Math.PI / 6);
        const second_point = [0,0];
        const beta = (Math.PI * 2 / 3) - alpha;
        const third_point  = [0,0];
        if(this.params.from_to![2] <= 0) {
            second_point[0] = first_point[0] + (Math.cos(alpha) * this.params.head_size!);
            second_point[1] = first_point[1] - (Math.sin(alpha) * this.params.head_size!);
            third_point[0] = first_point[0] - (Math.cos(beta) * this.params.head_size!);
            third_point[1] = first_point[1] - (Math.sin(beta) * this.params.head_size!);
        }
        else {
            second_point[0] = first_point[0] - (Math.cos(alpha) * this.params.head_size!);
            second_point[1] = first_point[1] + (Math.sin(alpha) * this.params.head_size!);
            third_point[0] = first_point[0] + (Math.cos(beta) * this.params.head_size!);
            third_point[1] = first_point[1] + (Math.sin(beta) * this.params.head_size!);
        }
        return [...first_point, ...second_point, ...third_point];
    }

    private getSlope() {
        return (this.params.from_to![1] - this.params.from_to![3]) / (this.params.from_to![0] - this.params.from_to![2])
    }

    private getFromTo() : [number, number, number, number] {
        const origin = this.axes_map.getOrigin();
        return [
            ...this.getPosition(this.params.from_to![0], this.params.from_to![1], origin),
            ...this.getPosition(this.params.from_to![2], this.params.from_to![3], origin),
        ];
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

export default Vector;