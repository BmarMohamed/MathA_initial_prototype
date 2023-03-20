const DefaultBackgroundParameters : BackgroundParameters = {
    width : 1280,
    height : 720,
    color : '#000000'
}

class BackgroundParameters {
    constructor(params : BackgroundParameters) {
        this.width = params.width || DefaultBackgroundParameters.width;
        this.height = params.height || DefaultBackgroundParameters.height;
        this.color = params.color || DefaultBackgroundParameters.color;
    }
    public width? : number;
    public height? : number;
    public color? : string; 
}

export default BackgroundParameters;