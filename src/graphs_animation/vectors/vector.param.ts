const DefaultVectorParameters : VectorParameters = {
    from_to : [0, 0, 1, 1],
    color : '#ffffff',
    line_width : 2,
    head_size : 2,
}

class VectorParameters {
    constructor(params : VectorParameters) {
        this.from_to = params.from_to || DefaultVectorParameters.from_to;
        this.color = params.color || DefaultVectorParameters.color;
        this.line_width = params.line_width || DefaultVectorParameters.line_width;
        this.head_size = params.head_size || DefaultVectorParameters.head_size;
    }
    
    public from_to? : [number, number, number, number];
    public color? : string;
    public line_width? : number;
    public head_size? : number;
}


export default VectorParameters;