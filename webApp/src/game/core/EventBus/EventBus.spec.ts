import getEventBus, { _resetEventBusForTests } from './EventBus';

describe('EventBus', () => {
    beforeEach(() => {
        _resetEventBusForTests();
    });

    it('should create', () => {
        const eventBus = getEventBus();
        expect(eventBus).toBeTruthy();
    });

    it('should return proper type string', () => {
        const eventBus = getEventBus();
        expect(eventBus.toString()).toBe("[object EventBus]");
    });

    it('should be singleton', () => {
        const eventBus = getEventBus();
        const eventBus2 = getEventBus();
        expect(eventBus2).toBe(eventBus);
    });

    it('should accept new subsciptions', () => {
        const callback = () => { };
        const caller = {
            get [Symbol.toStringTag]() {
                return "TestObject";
            }
        };
        const eventBus = getEventBus();
        expect(eventBus.on("newEvent", caller, callback)).toBeGreaterThanOrEqual(0);
    });

    it('should reject existing subsciptions', () => {
        const callback = () => { };
        const caller = {
            get [Symbol.toStringTag]() {
                return "TestObject";
            }
        };
        const eventBus = getEventBus();
        eventBus.on("event", caller, callback);
        expect(() => eventBus.on("event", caller, callback)).toThrowError(`${caller} is already subscribed to event with the same callback (${callback}).`)
    });

    it('should remove subscription by id', () => {
        const callback = jasmine.createSpy('callback', (value) => { console.info(value) });
        const caller = {
            get [Symbol.toStringTag]() {
                return "TestObject";
            }
        };
        const eventBus = getEventBus();
        const subscriptionsId = eventBus.on("newEvent", caller, callback);
        expect(() => eventBus.off(subscriptionsId)).not.toThrowError()
        eventBus.emit("newEvent", "Fired!");
        expect(callback).not.toHaveBeenCalled();
    });

    it('should remove all subscriptions by caller', () => {
        const callback = jasmine.createSpy('callback', (value) => { console.info(value) });
        const caller = {
            get [Symbol.toStringTag]() {
                return "TestObject";
            }
        };
        const eventBus = getEventBus();
        eventBus.on("newEvent", caller, callback);
        eventBus.on("otherEvent", caller, callback);
        expect(() => eventBus.unsubscribe(caller)).not.toThrowError()
        eventBus.emit("newEvent", "Fired!");
        eventBus.emit("otherEvent", "Fired!");
        expect(callback).not.toHaveBeenCalled();
    });

    it('should emit event', () => {
        const callback = jasmine.createSpy('callback', (value) => { console.info(value) });
        const caller = {
            get [Symbol.toStringTag]() {
                return "TestObject";
            }
        };
        const eventBus = getEventBus();
        eventBus.on("newEvent", caller, callback);
        eventBus.emit("newEvent", "Fired!");
        expect(callback).toHaveBeenCalledOnceWith("Fired!");
    });

});