export enum LogLevel {
    "CRITICAL" = 1,
    "ERROR" = 2,
    "WARNING" = 3,
    "INFO" = 4,
    "DEBUG" = 5,
}

class Logger {
    private static LOGHANDLERS: Record<LogLevel, (message: string) => void> = {
        [LogLevel.DEBUG]: (message: string) => console.debug(message),
        [LogLevel.INFO]: (message: string) => console.info(message),
        [LogLevel.WARNING]: (message: string) => console.warn(message),
        [LogLevel.ERROR]: (message: string) => console.error(message),
        [LogLevel.CRITICAL]: (message: string) => console.error(message)
    }

    public verbosoty: LogLevel

    constructor(verbosity: LogLevel) {
        this.verbosoty = verbosity;
    }

    public logDebug = (message: string): void => {
        this.log(message, LogLevel.DEBUG)
    }

    public logInfo = (message: string): void => {
        this.log(message, LogLevel.INFO)
    }

    public logWarning = (message: string): void => {
        this.log(message, LogLevel.WARNING)
    }

    public logError = (message: string | Error): void => {
        this.log(message, LogLevel.ERROR)
    }

    public logCritical = (message: string | Error): void => {
        this.log(message, LogLevel.CRITICAL)
    }

    private log = (message: string | Error, level: LogLevel): void => {
        if (level <= this.verbosoty) {
            const logMessage = `[${LogLevel[level]}] ${message}`
            Logger.LOGHANDLERS[level](logMessage)
        }
    }
}

let instance: Logger | null = null;

export default function getLogger(verbosity: LogLevel = LogLevel.DEBUG) {
    if (!instance)
        instance = new Logger(verbosity);
    return instance;
}

export function __resetLoggerForTests() {
    instance = null;
}