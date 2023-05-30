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
    }
} = {
    CoordinatesPlane : {
        ...LinePropertiesDefaultValue,
        sub_unit_line_width_ratio : 0.4,
    }
}

export default DefaultSettings;