import type { VikaruEventEmitter } from '../Types';
/**
 * Captures events from a vikaru event emitter & stores them in a file
 * @param ev The event emitter to read events from
 * @param filename File to save to
 */
export declare const captureEventStream: (ev: VikaruEventEmitter, filename: string) => void;
/**
 * Read event file and emit events from there
 * @param filename filename containing event data
 * @param delayIntervalMs delay between each event emit
 */
export declare const readAndEmitEventStream: (filename: string, delayIntervalMs?: number) => {
    ev: VikaruEventEmitter;
    task: Promise<void>;
};
