import Frame from "./frame.js";

const Animation = {

//Properties===========================================================================================================================================

    duration : 1,
    fps : 60,
    resolution : [1280, 720],
    background_color : "#000000",
    parent : "root",
    frames : [new Frame(0)],

//Setters===========================================================================================================================================

    setDuration(duration : number) { Animation.duration = duration },

    setFps(fps : number) { Animation.fps = fps },

    setResolution(width : number, height : number) { Animation.resolution = [width, height] },

    setBackgroundColor(background_color : string) { Animation.background_color = background_color },

    setParent(parent : string) { Animation.parent = parent },

//Methods===========================================================================================================================================

    at(frame_number : number) : Frame {
       return this.frames[frame_number] || this.frames[0]!; 
    },

    when(time : number) : Frame {
        return this.frames[time * Animation.fps] || this.frames[0]!; 
    },

    init() : void {
        CreateAndRenderAnimation();
        CreateAnimationFrames();
    },

    start() : void {
        startAnimation(Animation.frames[0]);
    }

//===========================================================================================================================================

}

//===========================================================================================================================================

function CreateAndRenderAnimation() {
    const html = document.createElement('div');
    html.id = "__animation__";
    html.style.cssText = 
    `
        display : inline-block;
        position : realtive;
        width : ${Animation.resolution[0]}px;
        height : ${Animation.resolution[1]}px;
        background-color : ${Animation.background_color};
    `;
    const parent = document.getElementById(Animation.parent) || document.body;
    parent.appendChild(html);
}

//===========================================================================================================================================

function CreateAnimationFrames() {
    const frames_number = Animation.duration * Animation.fps;
    for(let i = 1; i <= frames_number; i++)  Animation.frames.push(new Frame(i))
    for(let i = 1; i <= frames_number; i++) Animation.frames[i - 1].next = Animation.frames[i];
}

//===========================================================================================================================================

function startAnimation(frame : Frame) {
    const interval = setInterval(() => {
        frame.execute();
        if(frame.next) frame = frame.next!;
        else clearInterval(interval);
    }, 1000 / Animation.fps);
}

//===========================================================================================================================================

export default Animation;