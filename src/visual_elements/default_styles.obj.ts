interface ILineProperties {
    color? : string;
    line_width? : number;
}

const LinePropertiesDefaultValue : ILineProperties = {
    color : "#FFFFFF",
    line_width : 1,
}

const DefaultSettings : {
    CoordinatesPlane : ILineProperties & {
        sub_unit_line_width_ratio? : number;
    },
    Graph : ILineProperties;
    Point : {
        color? : string,
        radius? : number,
    },
    Line : ILineProperties;
} = {
    CoordinatesPlane : {
        ...LinePropertiesDefaultValue,
        sub_unit_line_width_ratio : 0.4,
    },
    Graph : {
        ...LinePropertiesDefaultValue,
    },
    Point : {
        color : LinePropertiesDefaultValue.color,
        radius : 5,
    },
    Line : {
        ...LinePropertiesDefaultValue,
    }
}

export default DefaultSettings;