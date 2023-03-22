const DefaultIntegralParameters : IntegralParameters = {
    domains : [[-2,2]],
    step : 0.01,
}

class IntegralParameters {
    constructor(params : IntegralParameters) {
        this.domains = params.domains || DefaultIntegralParameters.domains;
        this.step = params.step || DefaultIntegralParameters.step;
    }
    public domains? : Array<[number, number]>;
    public step? : number;
}


export default IntegralParameters;