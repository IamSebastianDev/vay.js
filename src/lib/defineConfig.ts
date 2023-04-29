/** @format */

import { VayConfig } from '../types';

const defaultConfig: VayConfig = {
    targetAttribute: 'vay',
    ignoreAttributes: false,
    removeAttributesOnRender: false,
    quiet: true,
};

/**
 * @description
 * Method used to create a valid Vay configuration object. Mostly used to enable autocomplete in modern IDEs.
 *
 * @param { Partial<VayConfig> } [props] - optional object containing properties to override the default
 * configuration properties of the config object.
 * @returns { VayConfig } a valid Vay configuration object.
 */

export const defineConfig = (props: Partial<VayConfig> = {}): VayConfig => {
    return {
        // default configuration properties
        ...defaultConfig,
        // merge user supplied configuration properties
        ...props,
    };
};
