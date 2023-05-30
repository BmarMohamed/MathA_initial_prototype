import VisualElement from "../visual_element.cls.js";
import DefaultSettings from "../default_settings.obj.js";
import DefaultStyles from "../default_styles.obj.js";
import Animation from "../../animation/animation.js";

class CoordinatesPlane extends VisualElement {

//Constructor===========================================================================================================================================

    constructor(
        settings : typeof DefaultSettings.CoordinatesPlane, 
        styles : typeof DefaultStyles.CoordinatesPlane
    ) {
        super();
        this.settings = getSettings(settings);
        this.styles = getSetyles(styles);
        this.horizontal_lines_start_points = this.getHorizontalLinesStartPoints();
        this.vertical_lines_start_points = this.getVerticalLinesStartPoints();
        this.setDrawStyles();
    }

//Properties===========================================================================================================================================

    private settings! : ReturnType<typeof getSettings>;
    private styles! : ReturnType<typeof getSetyles>;

    private horizontal_lines_start_points! : number[];
    private vertical_lines_start_points! : number[];

//Methods===========================================================================================================================================

    private setDrawStyles() {
        this.context.strokeStyle = this.styles.color;
        this.context.translate(this.settings.position[0], this.settings.position[1]);
    }

//===========================================================================================================================================

    private getHorizontalLinesStartPoints() {
        const horizontal_lines_start_points = [];
        let y_units_number = ((this.settings.range[1] - this.settings.range[0]) * this.settings.sub_units[1]);
        for(let i = 0; i <= y_units_number ; i++) {
            if(i % this.settings.sub_units[1] == 0) 
                horizontal_lines_start_points.push((this.settings.height * i / y_units_number));
            else
                horizontal_lines_start_points.push((this.settings.height * i / y_units_number));
        }
        return horizontal_lines_start_points;
    }

//===========================================================================================================================================

    private getVerticalLinesStartPoints() {
        const vertical_lines_start_points = [];
        let x_units_number = ((this.settings.domain[1] - this.settings.domain[0]) * this.settings.sub_units[0]);
        for(let i = 0; i <= x_units_number ; i++) {
            if(i % this.settings.sub_units[0] == 0) 
                vertical_lines_start_points.push((this.settings.width * i / x_units_number));
            else
                vertical_lines_start_points.push((this.settings.width * i / x_units_number));
        }
        return vertical_lines_start_points;
    }

//===========================================================================================================================================

    public draw() {
        this.drawAction(this.settings.width, this.settings.height);
    }

//===========================================================================================================================================

    private drawAction(width : number, height : number) {
        this.clear();
        //draw horizontal lines
        for(let i = 0; i < this.horizontal_lines_start_points.length; i++) {
            this.context.beginPath();
            this.context.moveTo(0, this.horizontal_lines_start_points[i]);
            this.context.lineTo(width, this.horizontal_lines_start_points[i]);
            if(i % this.settings.sub_units[1] == 0) 
                this.context.lineWidth = this.styles.line_width;
            else 
                this.context.lineWidth = this.styles.line_width * this.styles.sub_unit_line_width_ratio;
            this.context.stroke();
        }
        //draw vertical lines
        for(let i = 0; i < this.vertical_lines_start_points.length; i++) {
            this.context.beginPath();
            this.context.moveTo(this.vertical_lines_start_points[i], 0);
            this.context.lineTo(this.vertical_lines_start_points[i], height);
            if(i % this.settings.sub_units[0] == 0) 
                this.context.lineWidth = this.styles.line_width;
            else 
                this.context.lineWidth = this.styles.line_width * this.styles.sub_unit_line_width_ratio;
            this.context.stroke();
        }

    }

//===========================================================================================================================================

    private linearDraw(from : number, element : CoordinatesPlane, duration : number) {
        let current_frame = Animation.at(from).getNext();
        for(let i = 1; i <= duration; i++) {
            const width = this.settings.width / duration * i;
            const height = this.settings.height / duration * i;
            current_frame.doAction(this, 'drawAction', width, height);
            current_frame = current_frame.getNext();
        }
    }

//===========================================================================================================================================

}

//===========================================================================================================================================

function getSettings(settings : typeof DefaultSettings.CoordinatesPlane) {
    return {
        width : settings.width || DefaultSettings.CoordinatesPlane.width!,
        height : settings.height || DefaultSettings.CoordinatesPlane.height!,
        domain : settings.domain || DefaultSettings.CoordinatesPlane.domain!,
        range : settings.range || DefaultSettings.CoordinatesPlane.range!,
        position : settings.position || DefaultSettings.CoordinatesPlane.position!,
        sub_units : settings.sub_units || DefaultSettings.CoordinatesPlane.sub_units!,
    }
}

//===========================================================================================================================================

function getSetyles(styles : typeof DefaultStyles.CoordinatesPlane) {
    return {
        line_width : styles.line_width || DefaultStyles.CoordinatesPlane.line_width!,
        color : styles.color || DefaultStyles.CoordinatesPlane.color!,
        sub_unit_line_width_ratio : styles.sub_unit_line_width_ratio || DefaultStyles.CoordinatesPlane.sub_unit_line_width_ratio!
    }
}

//===========================================================================================================================================

export default CoordinatesPlane;