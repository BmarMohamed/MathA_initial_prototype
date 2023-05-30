import VisualElement from "../visual_element.cls.js";
import DefaultSettings from "../default_settings.obj.js";
import DefaultStyles from "../default_styles.obj.js";
import Animation from "../../animation/animation.js";

import constants from "../../data/constants.obj.js";
const { tau } = constants;

class Point extends VisualElement {

//Constructor===========================================================================================================================================

    constructor(
        settings : typeof DefaultSettings.Point, 
        styles : typeof DefaultStyles.Point
    ) {
        super();
        this.settings = getSettings(settings);
        this.styles = getSetyles(styles);
        this.setDrawStyles();
        this.coordinates = this.getCoordinatesOf(this.settings.location[0], this.settings.location[1]);
    }

//Properties===========================================================================================================================================

    private settings! : ReturnType<typeof getSettings>;
    private styles! : ReturnType<typeof getSetyles>;
    private coordinates! : [number, number];

//Methods===========================================================================================================================================

    private setDrawStyles() {
        this.context.fillStyle = this.styles.color;
        this.context.translate(this.settings.position[0], this.settings.position[1]);
    }

    private draw() {
        this.drawAction(0, 0);
    }

    private linearShrinkUnblur(from : number, point : Point, duration : number, distance : number, blur : number) {
        this.clear();
        let current_frame = Animation.at(from).getNext();
        let current_distance = distance;
        let current_blur = blur;
        current_frame.doAction(this, 'drawAction', current_distance, current_blur);
        for(let i = 1; i <= duration; i++) {
            current_distance -= distance / duration;
            current_blur -= blur / duration;
            current_frame.doAction(this, 'drawAction', current_distance, current_blur);
            current_frame = current_frame.getNext();
        }
    }

    private linearUnblur(from : number, point : Point, duration : number, blur : number) {
        this.clear();
        let current_frame = Animation.at(from).getNext();
        let current_blur = blur;
        current_frame.doAction(this, 'drawAction', 0, current_blur);
        for(let i = 1; i <= duration; i++) {
            current_blur -= blur / duration;
            current_frame.doAction(this, 'drawAction', 0, current_blur);
            current_frame = current_frame.getNext();
        }
    }

    private drawAction(distance : number, blur : number) {
        this.clear();
        this.context.beginPath();
        this.context.arc(this.coordinates[0], this.coordinates[1], this.styles.raduis, 0, tau);
        this.context.fill();
        this.canvas.style.transform = `translateZ(${distance}px)`;
        this.canvas.style.filter = `blur(${blur}px)`;
    }

}

//Getters===========================================================================================================================================

function getSettings(settings : typeof DefaultSettings.Point) {
    return {
        width : settings.width || DefaultSettings.Point.width!,
        height : settings.height || DefaultSettings.Point.height!,
        domain : settings.domain || DefaultSettings.Point.domain!,
        range : settings.range || DefaultSettings.Point.range!,
        location : settings.location || DefaultSettings.Point.location!,
        position : settings.position || DefaultSettings.Point.position!,
    }
}

function getSetyles(styles : typeof DefaultStyles.Point) {
    return {
        raduis : styles.radius || DefaultStyles.Point.radius!,
        color : styles.color || DefaultStyles.Point.color!,
    }
}

//Export===========================================================================================================================================

export default Point;