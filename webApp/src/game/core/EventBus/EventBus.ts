import getLogger from "../Logger/Logger";

interface Event {
    id: number,
    eventName: string,
    caller: object,
    callback: Function
}

class EventBus {
    private subscriptions: Array<Event>;
    private nextId: number = 0;
    private logger = getLogger();

    constructor() {
        this.subscriptions = [];
        this.logger.logDebug("EventBus has been initialized.")
    }

    public get [Symbol.toStringTag]() {
        return "EventBus";
    }

    public on = (eventName: string, caller: object, callback: Function): number => {
        if (this.subscriptions.filter(x => x.eventName == eventName && x.caller == caller && x.callback == callback).length > 0) {
            const err = new Error(`${caller} is already subscribed to ${eventName} with the same callback (${callback}).`);
            this.logger.logError(err);
            throw err;
        }
        this.subscriptions.push({
            id: this.nextId,
            eventName: eventName,
            caller: caller,
            callback: callback
        });
        this.logger.logDebug(`${caller} is subscribed to ${eventName} with the callback (${callback}).`)
        return this.nextId++;
    }

    public off = (id: number): void => {
        this.subscriptions = this.subscriptions.filter(x => x.id != id);
        this.logger.logDebug(`ID:${id} is removed from subscriptions.`)
    }

    public unsubscribe = (caller: object): void => {
        this.subscriptions = this.subscriptions.filter(x => x.caller != caller);
        this.logger.logDebug(`All subscripotions from ${caller} has been removed from subscriptions.`)
    }

    public emit = (eventName: string, value: any): void => {
        this.subscriptions.forEach(subscription => {
            if (subscription.eventName === eventName)
                subscription.callback(value);
        });
        this.logger.logDebug(`Event ${eventName} has been emitted to all subscribers.`)
    }

}

let instance: EventBus | null = null;

export default function getEventBus(): EventBus {
    if (!instance)
        instance = new EventBus();
    return instance;
}

export function _resetEventBusForTests(): void {
    instance = null;
}