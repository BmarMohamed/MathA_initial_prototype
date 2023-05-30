const ColorsTools = {
    colorToObject(color : string) {
        return {
            red : Number.parseInt(color.slice(0,2), 16),
            green : Number.parseInt(color.slice(2,4), 16),
            blue : Number.parseInt(color.slice(4,), 16)
        };
    },
    
    objectToColor(object : { red : number, green : number, blue : number }) {
        return `#${colorToHex(object.red)}${colorToHex(object.green)}${colorToHex(object.blue)}`;
    },
}

function colorToHex(color : number) {
    if(color > 255) color = 255;
    else if(color < 0) color = 0;
    else color = Math.round(color);
    return color.toString(16);
}

export default ColorsTools;