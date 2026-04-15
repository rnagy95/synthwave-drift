export class GameEngine {
    FRAMES_PER_SECOND: number = 60;

    step: number = 1000 / this.FRAMES_PER_SECOND;
    lastFrameTimeStamp: number = 0;
    elapsedTime: number = 0;
    animationFrameId?: number = undefined;
    isRunning: boolean = false;
    update: Function;
    render: Function;

    constructor(update: Function, render: Function) {
        this.update = update;
        this.render = render;
    }

    private gameLoop = (timestamp: number): void => {
        if (!this.isRunning)
            return;

        let deltaTime = timestamp - this.lastFrameTimeStamp;
        this.elapsedTime += deltaTime;
        this.lastFrameTimeStamp = timestamp;

        while (this.elapsedTime >= this.step) {
            this.update(this.FRAMES_PER_SECOND)
            this.elapsedTime -= this.FRAMES_PER_SECOND
        }

        this.render()

        this.animationFrameId = requestAnimationFrame(this.gameLoop)
    }

    public start = (): void => {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animationFrameId = requestAnimationFrame(this.gameLoop);
        }
        else {
            throw new Error("Game is already running.")
        }
    }

    public stop = (): void => {
        if (this.isRunning) {
            this.isRunning = false;
            if (!!this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = undefined;
            }
        }
        else{
            throw new Error("Game is not running.")
        }
    }

}