const DefaultNameParameters : NameParameters = {
    text : '',
    position : [0, 0],
    font_size : 16,
    color : '#ffffff',
}

class NameParameters {
    constructor(params : NameParameters) {
        this.text = params.text || DefaultNameParameters.text;
        this.position = params.position || DefaultNameParameters.position;
        this.font_size = params.font_size || DefaultNameParameters.font_size;
        this.color = params.color || DefaultNameParameters.color;
    }
    public text? : string;
    public position? : [number, number];
    public font_size? : number;
    public color? : string;
}


export default NameParameters;