import VisualElement from "../visual_elements/visual_element.cls.js";

class Frame {

//Constructor===========================================================================================================================================

    constructor(frame_number : number) {
        this.actions = [];
        this.frame_number = frame_number;
    }   

//Properties===========================================================================================================================================

    public frame_number! : number;   
    public next? : Frame;
    public actions! : Array<[VisualElement, string, any[]]>;

//Methods===========================================================================================================================================

    public do(element : VisualElement, action : string, ...params : any[]) {
        const parameters = [this.frame_number, element, ...params];
        this.actions.push([element, action, parameters])
        return this;
    }

    public addAction(element : VisualElement, action : string, ...params : any[]) {
        this.actions.push([element, action, params])
        return this;
    }

    public execute() {
        for(const action of this.actions)  {
            if(action[0][action[1]])  
                action[0][action[1]](...action[2]);
        }
    }

//===========================================================================================================================================

}

export default Frame;