import Background from "../background/background.cls.js";
import AxesMapParameters from "./axes_map.params.js";

class AxesMap {
    constructor(params : AxesMapParameters, background : Background) {
        this.self_id = AxesMap.id++;
        this.params = new AxesMapParameters(params);
        this.background = background;
        this.html = document.createElement('canvas');
        this.setup();
    }
    private static id : number = 0;
    public self_id : number;
    public params : AxesMapParameters;
    public background : Background;
    public html : HTMLCanvasElement;

    private setup() {
        this.html.width = this.background.params.width!;
        this.html.height = this.background.params.height!;
        const ctx = this.html.getContext('2d')!;
        ctx.strokeStyle = this.params.color!;
        this.createLines(ctx);
        this.createSublines(ctx);
    }

    private createLines(ctx : CanvasRenderingContext2D) {
        ctx.lineWidth = this.params.line_width!;
        let x = 0;
        for(let i = 0; i < this.params.x_units!; i++) {
            ctx.beginPath();
            x += (this.background.params.width! / this.params.x_units!);
            ctx.moveTo(x - (this.params.line_width! / 2), 0)
            ctx.lineTo(x - (this.params.line_width! / 2), this.background.params.height!);
            ctx.stroke();
        }
        let y = 0;
        for(let i = 0; i < this.params.y_units!; i++) {
            ctx.beginPath();
            y += (this.background.params.height! / this.params.y_units!);
            ctx.moveTo(0, y - (this.params.line_width! / 2))
            ctx.lineTo(this.background.params.width!, y - (this.params.line_width! / 2));
            ctx.stroke();
        }
    }

    private createSublines(ctx : CanvasRenderingContext2D) {
        ctx.lineWidth = this.params.sub_line_width!;
        let x = 0;
        let x_sub_units = this.params.x_units! * this.params.x_sub_units!
        for(let i = 0; i < x_sub_units!; i++) {
            ctx.beginPath();
            x += (this.background.params.width! / x_sub_units!);
            ctx.moveTo(x - (this.params.line_width! / 2), 0)
            ctx.lineTo(x - (this.params.line_width! / 2), this.background.params.height!);
            ctx.stroke();
        }
        let y = 0;
        let y_sub_units = this.params.y_units! * this.params.y_sub_units!
        for(let i = 0; i < y_sub_units!; i++) {
            ctx.beginPath();
            y += (this.background.params.height! / y_sub_units!);
            ctx.moveTo(0, y - (this.params.line_width! / 2))
            ctx.lineTo(this.background.params.width!, y - (this.params.line_width! / 2));
            ctx.stroke();
        }
    }

    public render() {
        this.background.html.appendChild(this.html);
        return this;
    }
}

export default AxesMap;