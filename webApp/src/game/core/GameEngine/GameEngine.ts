import getLogger from "../Logger/Logger";

export class GameEngine {
    public FRAMES_PER_SECOND: number = 60;

    public isRunning: boolean = false;
    private step: number = 1000 / this.FRAMES_PER_SECOND;
    private lastFrameTimeStamp: number = 0;
    private elapsedTime: number = 0;
    private animationFrameId?: number = undefined;
    private update: Function;
    private render: Function;
    private logger = getLogger();

    constructor(update: Function, render: Function) {
        this.update = update;
        this.render = render;
        this.logger.logDebug("GameEngine have been initialized.")
    }

    private gameLoop = (timestamp: number): void => {
        this.logger.logDebug("GameEngine.gameLoop has been called")
        if (!this.isRunning)
            return;

        let deltaTime = timestamp - this.lastFrameTimeStamp;
        this.elapsedTime += deltaTime;
        this.lastFrameTimeStamp = timestamp;

        while (this.elapsedTime >= this.step) {
            this.logger.logInfo(`FRAMERATE=${Math.round(1000 / this.elapsedTime)}FPS`)
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
            this.logger.logDebug("Game has been started.")
        }
        else {
            const err = new Error("Game is tried to be started while already running.");
            this.logger.logError(err);
            throw err;
        }
    }

    public stop = (): void => {
        if (this.isRunning) {
            this.isRunning = false;
            if (!!this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = undefined;
            }
            this.logger.logDebug("Game has been stopped.")
        }
        else {
            const err = new Error("Game is tried to be stopped while not running.");
            this.logger.logError("err");
            throw err;
        }
    }

}