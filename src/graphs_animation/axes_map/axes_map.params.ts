const DefaultAxesMapParameters : AxesMapParameters = {
    x_units : 4,
    y_units : 4,
    x_sub_units : 5,
    y_sub_units : 5,
    line_width : 1,
    sub_line_width : 0.2,
    color : '#ffffff'
}

class AxesMapParameters {
    constructor(params : AxesMapParameters) {
        this.x_units = params.x_units || DefaultAxesMapParameters.x_units;
        this.y_units = params.y_units || DefaultAxesMapParameters.y_units;
        this.x_sub_units = params.x_sub_units || DefaultAxesMapParameters.x_sub_units;
        this.y_sub_units = params.y_sub_units || DefaultAxesMapParameters.y_sub_units;
        this.line_width = params.line_width || DefaultAxesMapParameters.line_width;
        this.sub_line_width = params.sub_line_width || DefaultAxesMapParameters.sub_line_width;
        this.color = params.color || DefaultAxesMapParameters.color;
    }
    public x_units? : number;
    public y_units? : number;
    public x_sub_units? : number;
    public y_sub_units? : number;
    public line_width? : number;
    public sub_line_width? : number;
    public color? : string;
}

export default AxesMapParameters;