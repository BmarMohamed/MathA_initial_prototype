import BackgroundParameters from "./background.params.js";

class Background {
    constructor(params : BackgroundParameters) {
        this.self_id = Background.id++;
        this.params = new BackgroundParameters(params);
        this.html = document.createElement('div');
        this.setup();
    }
    static id : number = 0;
    public self_id : number;
    public params : BackgroundParameters;
    public html : HTMLDivElement;

    private setup() {
        this.html.style.width = `${this.params.width}px`
        this.html.style.height = `${this.params.height}px`
        this.html.style.backgroundColor = this.params.color!;
        this.html.style.zIndex = '1';
    }

    public renderIn(root? : HTMLElement) {
        const parent = root || document.getElementById('root');
        parent?.appendChild(this.html);
        return this;
    }
}

export default Background;