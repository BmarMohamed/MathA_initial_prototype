import Animation from "../animation/animation.js"

class VisualElement {

//===========================================================================================================================================

    [key : string] : any;
    constructor() {
        this.id = VisualElement.visual_element_id++;
        this.canvas = document.createElement('canvas');
        this.canvas.id = `visuale-element:${this.id}`;
        this.canvas.style.cssText = 
        `
            display : inline-block;
            position : Absolute;
            z-index : ${this.id};
        `;
        this.canvas.width = Animation.resolution[0];
        this.canvas.height = Animation.resolution[1];
        this.context = this.canvas.getContext('2d')!;
        document.getElementById("__animation__")!.appendChild(this.canvas);
    }

//===========================================================================================================================================

    static visual_element_id = 1;
    protected id! : number;
    protected canvas! : HTMLCanvasElement;
    protected context! : CanvasRenderingContext2D;

//===========================================================================================================================================

    protected clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    protected getCoordinatesOf(x : number, y : number) : [number, number] {
        if(
            this["settings"]["width"] &&
            this["settings"]["height"] &&
            this["settings"]["domain"] &&
            this["settings"]["range"]
        ) {
            return[
                (x - this["settings"]["domain"][0]) 
                * 
                this["settings"]["width"] 
                / 
                (this["settings"]["domain"][1] - this["settings"]["domain"][0]),

                this["settings"]["height"] - (y - this["settings"]["range"][0]) 
                * 
                this["settings"]["height"] 
                / 
                (this["settings"]["range"][1] - this["settings"]["range"][0]),
            ]
        }
        else return [0, 0];
    }

//===========================================================================================================================================

}

export default VisualElement;