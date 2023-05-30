import Animation from "../animation/animation.js";

export interface IResolutionAndCoordinates {
    width? : number;
    height? : number;
    domain? : [number, number];
    range? : [number, number];
    position? : [number, number];
}

const ResolutionAndCoordinatesDefaultValue : IResolutionAndCoordinates = {
    width : Animation.resolution[0],
    height : Animation.resolution[1],
    domain : [-1, 1],
    range : [-1, 1],
    position : [0, 0],
}

const DefaultSettings : {
    CoordinatesPlane : IResolutionAndCoordinates & {
        sub_units? : [number, number];
    },
    Graph : IResolutionAndCoordinates & {
        unwanted_values? : number[];
        unwanted_domains? : Array<[number, number]>;
        expression? : (x : number) => number;
        step? : number;
        accuracy? : number; 
    },
    Point : IResolutionAndCoordinates & {
        location? : [number, number]
    }
} = {
    CoordinatesPlane : {
        ...ResolutionAndCoordinatesDefaultValue,
        sub_units : [2, 2],
    },
    Graph :  {
        ...ResolutionAndCoordinatesDefaultValue,
        unwanted_values : [],
        unwanted_domains : [],
        expression : (x : number) => x,
        step : 0.01,
        accuracy : 4,
    },
    Point : {
        ...ResolutionAndCoordinatesDefaultValue,
        location : [0, 0],
    }
}

export default DefaultSettings;