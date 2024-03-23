/** @format */
/**
 * Utility function used to assert the current execution environment.
 * @returns { boolean } true if the function is executed in a browser environment, false if not.
 */
export const getExecutionContext = (): boolean => {
    try {
        // Attempt to access a browser-specific global object. This will throw an error in Node.js
        return typeof window !== 'undefined' && typeof window.document !== 'undefined';
    } catch (e) {
        // If accessing the global object throws an error, we're not in a browser environment
        return false;
    }
};
