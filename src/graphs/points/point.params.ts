const DefaultPointParameters : PointParameters = {
    position : [0, 0],
    radius : 2,
    color : '#ffffff',
}

class PointParameters {
    constructor(params : PointParameters) {
        this.position = params.position || DefaultPointParameters.position;
        this.radius = params.radius || DefaultPointParameters.radius;
        this.color = params.color || DefaultPointParameters.color;
    }
    
    public position? : [number, number];
    public radius? : number;
    public color? : string;
}


export default PointParameters;