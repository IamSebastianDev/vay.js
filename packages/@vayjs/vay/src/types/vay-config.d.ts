/** @format */

import { ISO639Code } from './iso-639-code';

/**
 * @description
 * Object used to configure a Vay instance.
 */

export type VayConfig = {
    /**
     * @type { string }
     * @description
     * The attribute tag used to mark an element for translation by the static translation method.
     * The default tag used is 'vay'.
     */
    targetAttribute: string;

    /**
     * @type { boolean }
     * @description
     * A boolean indicating if `vay-*` attribute tags should be ignored. By default, this value is
     * `false`.
     */
    ignoreAttributes: boolean;

    /**
     * @type { boolean }
     * @description
     * A boolean indicating if all vay-attributes should be removed after translation. By default,
     * this value is `false`.
     */
    removeAttributesOnRender: boolean;

    /**
     * @type { boolean }
     * @description
     * A boolean indicating if warnings should be suppressed. Is true by default, but can be set to false
     * to enable debugging messages in the console.
     */
    quiet: boolean;

    /**
     * @type { ISO639Code }
     * The default locale used to render the initial set of translations.
     */
    defaultLocale: ISO639Code;
};
