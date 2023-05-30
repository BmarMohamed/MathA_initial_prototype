import constants from "./constants.obj.js"

const { e } = constants;

export default {
    exp : (x : number) => Math.pow(e, x),
    ln : (x : number) => Math.log(x),
    log10 : (x : number) => Math.log10(x),
    log2 : (x : number) => Math.log2(x),
    logY : (x : number, y : number) => Math.log(x) /  Math.log(y),

    pow : (x : number, y : number) => Math.pow(x, y),
    squar : (x : number) => x * x,
    cube : (x : number) => x * x * x,

    rt2 : (x : number) => Math.sqrt(x),
    rt3 : (x : number) => Math.cbrt(x),
    rtY : (x : number, y : number) => Math.exp((1 / y) * Math.log(x)),

    cos : (x : number) => Math.cos(x),
    sin : (x : number) => Math.sin(x),
    tan : (x : number) => Math.tan(x),

    sec : (x : number) => 1 / Math.cos(x),
    csc : (x : number) => 1 / Math.sin(x),
    cot : (x : number) => 1 / Math.tan(x),
}