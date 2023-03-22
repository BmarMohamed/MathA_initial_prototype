const DefaultIntegralParameters : IntegralParameters = {
    domain : [-2,2],
    step : 0.01,
}

class IntegralParameters {
    constructor(params : IntegralParameters) {
        this.domain = params.domain || DefaultIntegralParameters.domain;
        this.step = params.step || DefaultIntegralParameters.step;
    }
    public domain? : [number, number];
    public step? : number;
}


export default IntegralParameters;