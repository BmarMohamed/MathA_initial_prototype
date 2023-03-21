const DefaultGraphParameters : GraphParameters = {
    name : 'f',
    parameter : 'x',
    expression : (x : number) => x,
    domains : [[-2,2]],
    color : '#ff00ff',
    line_width : 2,
}

class GraphParameters {
    constructor(params : GraphParameters) {
        this.name = params.name || DefaultGraphParameters.name;
        this.parameter = params.parameter || DefaultGraphParameters.parameter;
        this.expression = params.expression || DefaultGraphParameters.expression;
        this.domains = params.domains || DefaultGraphParameters.domains;
        this.color = params.color || DefaultGraphParameters.color;
        this.line_width = params.line_width || DefaultGraphParameters.line_width;
    }

    public name? : string;
    public parameter? : string;
    public expression? : (x : number) => number;
    public domains? : Array<[number, number]>;
    public color? : string;
    public line_width? : number;
}


export default GraphParameters;