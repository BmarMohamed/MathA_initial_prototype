import Animation from "./animation/animation.js";
import CoordinatesPlane from "./visual_elements/elements/coordinates_plane.cls.js";
import Graph from "./visual_elements/elements/graph.cls.js";
import Point from "./visual_elements/elements/point.cls.js";
import HorizontalLine from "./visual_elements/elements/lines/horizontal_line.cls.js";
import VerticalLine from "./visual_elements/elements/lines/vertical_line.cls.js";
import DiagonalLine from "./visual_elements/elements/lines/diagonal_line.cls.js";

const MathA = {
    Animation,
    GraphsComponents : {
        CoordinatesPlane,
        Graph,
        Point,
        HorizontalLine,
        VerticalLine,
        DiagonalLine,
    }
}

export default MathA;