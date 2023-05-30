import VisualElement from "../visual_element.cls.js";
import DefaultSettings from "../default_settings.obj.js";
import DefaultStyles from "../default_styles.obj.js";
import Animation from "../../animation/animation.js";

import Tools from "../../tools/tools.obj.js";
const { DomainsTools, NumbersTools } = Tools;

class Graph extends VisualElement {

//Constructor===========================================================================================================================================

    constructor(
        settings : typeof DefaultSettings.Graph, 
        styles : typeof DefaultStyles.Graph
    ) {
        super();
        this.settings = getSettings(settings);
        this.styles = getStyles(styles);
        this.setDrawStyles();
        this.addUnwantedXValues();
        this.domains = this.getDomains([this.settings.domain],  this.settings.unwanted_domains);
        this.values = this.getvalues();
        this.points_map = this.getPointsMap();
    }

// //Properties===========================================================================================================================================

    private settings! : ReturnType<typeof getSettings>;
    private styles! : ReturnType<typeof getStyles>;
    private domains! : Array<[number, number]>;
    private values! : number[][];
    private points_map! : Map<number, number>;

//Methods===========================================================================================================================================

    private setDrawStyles() {
        this.context.strokeStyle = this.styles.color;
        this.context.lineWidth = this.styles.line_width;
        this.context.translate(this.settings.position[0], this.settings.position[1]);
    }

    private addUnwantedXValues() {
        for(const unwanted_value of this.settings.unwanted_values) {
            this.settings.unwanted_domains.push([unwanted_value, unwanted_value]);
        } 
    }

    private getDomains(domains : Array<[number, number]>, unwanted_domains : Array<[number, number]>) : Array<[number, number]> {
        let result_domains : Array<[number, number]> = [];
        if(unwanted_domains.length) {
            const unwanted_domain = unwanted_domains.shift();
            for(let domain of domains) {
                const subtract_result = DomainsTools.subtractDomainBy(domain, unwanted_domain!);
                if(subtract_result) result_domains = [...result_domains, ...subtract_result]
                else continue;
            }
            return this.getDomains(result_domains, unwanted_domains);
        }
        else return domains;
    }

    private transformDomainToValues(domain : [number, number]) {
        const values = [];
        for(
            let i = NumbersTools.toFixedAs(domain[0] + this.settings.step, this.settings.step);
            i < NumbersTools.toFixedAs(domain[1], this.settings.step);
            i = NumbersTools.toFixedAs(i + this.settings.step, this.settings.step)
        ) values.push(i);
        return values;
    }

    private getvalues() {
        const values = [];
        for(let domain of this.domains) {
            values.push(this.transformDomainToValues(domain))
        }
        return values;
    }

    private getPointsMap() {
        const points_map = new Map();
        for(let values_of_domain of this.values) {
            for(let value of values_of_domain) {
                points_map.set(value, NumbersTools.toFixedAs(
                    this.settings.expression(value), Math.pow(10, - this.settings.accuracy)
                ));
            }
        }
        return points_map;
    }

    private getDrawLines() {
        let draw_lines : Array<[[number, number], [number, number]]> = [];
        for(let domain_values of this.values) {
            draw_lines = draw_lines.concat(
                this.getDrawLinesOfDomain(domain_values)
            )
        }
        return draw_lines;
    }

    private isUnwantedLine(from : [number, number], to : [number, number]) {
        if(
            from[0] <= 0 ||
            to[0] > this.settings.width ||
            from[1] < 0 ||
            from[1] > this.settings.height ||
            to[1] < 0 ||
            to[1] > this.settings.height
        ) 
        return true
        else false;
    }

    private getDrawLinesOfDomain(domain_values : number[]) {
        const draw_lines : Array<[[number, number], [number, number]]> = [];
        if(domain_values.length > 2)
        for(let i = 0; i < domain_values.length - 1; i++) {
            const line = this.getDrawLine(domain_values[i], domain_values[i + 1])
            if(!this.isUnwantedLine(...line)) draw_lines.push(line);
        }
        return draw_lines;
    }

    private getDrawLine(x1 : number, x2 : number) : [[number, number], [number, number]]{
        return [
            this.getCoordinatesOf(x1, this.points_map.get(x1)!),
            this.getCoordinatesOf(x2, this.points_map.get(x2)!),
        ]
    }

    private drawLine(from : [number, number], to : [number, number]) {
        this.context.beginPath();
        this.context.moveTo(...from);
        this.context.lineTo(...to);
        this.context.stroke();
    }

    private draw() {
        this.drawAction(
            this.getDrawLines()
        );
    }

    private linearDraw(from : number, element : Graph, duration : number) {
        let current_frame = Animation.at(from).getNext();
        const lines = this.getDrawLines();
        const lines_per_frame = Math.floor(lines.length / duration);
        let current_lines = lines.slice(0, lines.length % duration)
        current_frame.doAction(this, 'drawAction', current_lines);
        for(let i = 1; i <= duration; i++) {
            current_lines = lines.slice(0, lines.length % duration + lines_per_frame * i);
            current_frame.doAction(this, 'drawAction', current_lines);
            current_frame = current_frame.getNext();
        }
    }

    private drawAction(lines : Array<[[number, number], [number, number]]>) {
        this.clear();
        for(const line of lines) {this.drawLine(...line)};
    }
}

//Getters===========================================================================================================================================

function getSettings(settings : typeof DefaultSettings.Graph) {
    return {
        width : settings.width || DefaultSettings.CoordinatesPlane.width!,
        height : settings.height || DefaultSettings.CoordinatesPlane.height!,
        domain : settings.domain || DefaultSettings.Graph.domain!,
        range : settings.range || DefaultSettings.Graph.range!,
        position : settings.position || DefaultSettings.Graph.position!,
        unwanted_values : settings.unwanted_values || DefaultSettings.Graph.unwanted_values!,
        unwanted_domains : settings.unwanted_domains || DefaultSettings.Graph.unwanted_domains!,
        expression : settings.expression || DefaultSettings.Graph.expression!,
        step : settings.step || DefaultSettings.Graph.step!,
        accuracy : settings.accuracy || DefaultSettings.Graph.accuracy!,
    }
}


function getStyles(styles : typeof DefaultStyles.Graph) {
    return {
        line_width : styles.line_width || DefaultStyles.Graph.line_width!,
        color : styles.color || DefaultStyles.Graph.color!,
    }
}

//Export===========================================================================================================================================

export default Graph;