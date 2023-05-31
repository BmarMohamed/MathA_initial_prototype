import VisualElement from "../../visual_element.cls.js";
import DefaultSettings from "../../default_settings.obj.js";
import DefaultStyles from "../../default_styles.obj.js";
import Animation from "../../../animation/animation.js";

class VerticalLine extends VisualElement {

//Constructor===========================================================================================================================================

    constructor(
        settings : typeof DefaultSettings.VerticalLine, 
        styles : typeof DefaultStyles.Line
    ) {
        super();
        this.settings = getSettings(settings);
        this.styles = getStyles(styles);
        this.setDrawStyles();
    }

//Properties===========================================================================================================================================

    private settings! : ReturnType<typeof getSettings>;
    private styles! : ReturnType<typeof getStyles>;

//Methods===========================================================================================================================================

    private setDrawStyles() {
        this.context.strokeStyle = this.styles.color;
        this.context.lineWidth = this.styles.line_width;
        this.context.translate(this.settings.position[0], this.settings.position[1]);
    }

    private draw() {
        this.drawAction(this.settings.length)
    }

    private linearDraw(from : number, element : VerticalLine, duration : number) {
        let current_frame = Animation.at(from).getNext();
        for(let i = 1; i <= duration; i++) {
            current_frame.doAction(this, 'drawAction', this.settings.length / duration * i);
            current_frame = current_frame.getNext();
        }
    }

    private drawAction(length : number) {
        const start = this.getCoordinatesOf(this.settings.location[0], this.settings.location[1])
        const end = this.getCoordinatesOf(this.settings.location[0], this.settings.location[1] + length);
        this.context.beginPath();
        this.context.moveTo(...start);
        this.context.lineTo(...end);
        this.context.stroke();
    }

}

//Getters===========================================================================================================================================

function getSettings(settings : typeof DefaultSettings.VerticalLine) {
    return {
        width : settings.width || DefaultSettings.VerticalLine.width!,
        height : settings.height || DefaultSettings.VerticalLine.height!,
        domain : settings.domain || DefaultSettings.VerticalLine.domain!,
        range : settings.range || DefaultSettings.VerticalLine.range!,
        position : settings.position || DefaultSettings.VerticalLine.position!,
        location : settings.location || DefaultSettings.VerticalLine.location!,
        length : settings.length || DefaultSettings.VerticalLine.length!,
    }
}

function getStyles(styles : typeof DefaultStyles.Line) {
    return {
        line_width : styles.line_width || DefaultStyles.Line.line_width!,
        color : styles.color || DefaultStyles.Line.color!,
    }
}

//Export===========================================================================================================================================

export default VerticalLine;