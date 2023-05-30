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

//===========================================================================================================================================

}

export default VisualElement;