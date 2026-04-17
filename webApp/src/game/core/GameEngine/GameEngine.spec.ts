import { GameEngine } from './GameEngine';

describe('GameEngine', () => {
    beforeEach(() => {
        jasmine.clock().install();

        spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
            return setTimeout(() => cb(17), 17);
        });

        spyOn(window, 'cancelAnimationFrame').and.callFake((id) => {
            clearTimeout(id);
        });
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    })



    it('should create', () => {
        const update = (timestamp: number) => { };
        const render = () => { };
        const engine = new GameEngine(update, render);
        expect(engine).toBeTruthy()
    });

    it('should start', () => {
        const update = (timestamp: number) => { };
        const render = () => { };
        const engine = new GameEngine(update, render);
        engine.start()
        expect(engine.isRunning).toBeTrue()
        expect(window.requestAnimationFrame).toHaveBeenCalled()
    });

    it('should run or each tick', () => {
        const update = jasmine.createSpy('update', (timestamp: number) => { });
        const render = jasmine.createSpy('render', () => { });
        const engine = new GameEngine(update, render);
        engine.start()
        jasmine.clock().tick(20);
        expect(update).toHaveBeenCalledWith(engine.FRAMES_PER_SECOND)
        expect(render).toHaveBeenCalled()
        jasmine.clock().tick(20);
        expect(update).toHaveBeenCalledWith(engine.FRAMES_PER_SECOND)
        expect(render).toHaveBeenCalled()
    });

    it('should stop', () => {
        const update = jasmine.createSpy('update', (timestamp: number) => { });
        const render = jasmine.createSpy('render', () => { });
        const engine = new GameEngine(update, render);
        engine.start()
        jasmine.clock().tick(20);
        expect(update).toHaveBeenCalledWith(60)
        expect(render).toHaveBeenCalled()
        engine.stop()
        update.calls.reset()
        render.calls.reset()
        expect(engine.isRunning).toBeFalse()
        expect(window.cancelAnimationFrame).toHaveBeenCalled()
        expect(update).not.toHaveBeenCalled()
        expect(render).not.toHaveBeenCalled()
    });

    it('should throw error on start when already running', () => {
        const update = (timestamp: number) => { };
        const render = () => { };
        const engine = new GameEngine(update, render);
        engine.start()
        expect(() => engine.start()).toThrowError("Game is tried to be started while already running.")
    });

    it('should throw error on stop when not running', () => {
        const update = (timestamp: number) => { };
        const render = () => { };
        const engine = new GameEngine(update, render);
        expect(() => engine.stop()).toThrowError("Game is tried to be stopped while not running.")
    });

    it('should not call update and render if stopped', () => {
        const update = jasmine.createSpy('update', (timestamp: number) => { });
        const render = jasmine.createSpy('render', () => { });
        const engine = new GameEngine(update, render);
        engine.start();
        //stop engine without cancelling animation frame
        engine.isRunning = false;
        jasmine.clock().tick(20);
        expect(update).not.toHaveBeenCalled()
        expect(render).not.toHaveBeenCalled()
    });
});
