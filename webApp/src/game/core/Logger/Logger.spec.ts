import getLogger, { __resetLoggerForTests } from "./Logger";

describe("Logger", () => {
    beforeEach(()=>{
        __resetLoggerForTests();
    });

    it('should create', () => {
        const logger = getLogger();
        expect(logger).toBeTruthy();
    });

    it('should be singleton', () => {
        const logger = getLogger();
        const logger2 = getLogger();
        expect(logger2).toBe(logger);
    });

    it('should log debug', () => {
        const debug = spyOn(console, 'debug').and.callFake((message: string) => { });
        const logger = getLogger();
        logger.logDebug("Test message");
        expect(debug).toHaveBeenCalledOnceWith("[DEBUG] Test message");
    });

    it('should log info', () => {
        const info = spyOn(console, 'info').and.callFake((message: string) => { });
        const logger = getLogger();
        logger.logInfo("Test message");
        expect(info).toHaveBeenCalledOnceWith("[INFO] Test message");
    });

    it('should log warning', () => {
        const warn = spyOn(console, 'warn').and.callFake((message: string) => { });
        const logger = getLogger();
        logger.logWarning("Test message");
        expect(warn).toHaveBeenCalledOnceWith("[WARNING] Test message");
    });

    it('should log error', () => {
        const error = spyOn(console, 'error').and.callFake((message: string) => { });
        const logger = getLogger();
        logger.logError("Test message");
        expect(error).toHaveBeenCalledOnceWith("[ERROR] Test message");
    });

    it('should log critical', () => {
        const error = spyOn(console, 'error').and.callFake((message: string) => { });
        const logger = getLogger();
        logger.logCritical("Test message");
        expect(error).toHaveBeenCalledOnceWith("[CRITICAL] Test message");
    });

    it('should not log if verbosity set to lower', async () => {
        const info = spyOn(console, 'info').and.callFake((message: string) => { });
        const logger = getLogger();
        logger.verbosoty = 2;
        logger.logInfo("Test message");
        expect(info).not.toHaveBeenCalled()
    });
})