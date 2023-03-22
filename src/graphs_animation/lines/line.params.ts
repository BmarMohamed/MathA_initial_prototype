const DefaultLineParameters : LineParameters = {
    a : 0,
    b : 0,
    domain : [-2, 2],
    line_width : 1,
    color : '#ffffff',
}

class LineParameters {
    constructor(params : LineParameters) {
        this.a = params.a || DefaultLineParameters.a;
        this.b = params.b || DefaultLineParameters.b;
        this.domain = params.domain || DefaultLineParameters.domain;
        this.line_width = params.line_width || DefaultLineParameters.line_width;
        this.color = params.color || DefaultLineParameters.color;
    }
    public a? : number;
    public b? : number;
    public domain? : [number, number];
    public line_width? : number;
    public color? : string;
}


export default LineParameters;