/** @format */

import { Phrase } from '../types/phrase';
import { ProcessConfig } from '../types/process-config';
import { VayProvider } from '../types/vay-provider';
import { VayStaticProvider } from '../types/vay-static.provider';
import { filterAttributeNames } from '../utils/filter-attribute-names';
import { getExecutionContext } from '../utils/get-execution-environment';

/**
 * Creates a static translation provider that utilizes an existing VayProvider to translate
 * text content and attributes within HTML elements. This function is designed to support
 * static web pages where translations can be applied directly to the DOM elements based on
 * specified attributes. It enables automatic translation of elements and their attributes
 * to the currently active language set in the VayProvider.
 *
 * @param {VayProvider<Dict>} provider An existing VayProvider instance containing the translations
 *                                     and configuration necessary for translating phrases.
 *
 * @returns An object with a `render` function that can be called to apply translations to
 *          the content of a specified anchor element and its child elements. The translations
 *          are applied based on the target attribute specified in the VayProvider's configuration.
 *
 * The `render` function takes an HTML element (`anchor`) as its parameter. It searches for all
 * child elements of the anchor that have the target attribute specified in the VayProvider's
 * configuration and applies translations to their text content or attributes. This function
 * also supports removing the translation-related attributes after rendering to clean up the markup.
 *
 * Note: This function requires execution in a browser environment as it manipulates the DOM.
 *       It will throw an error if called outside a browser context.
 *
 * @example
 * Assuming `provider` is an instance of VayProvider configured for your application, you can
 * translate static content within a specified element as follows:
 *
 * ```ts
 * // Import the function as well as the previously created provider
 * import {provider} from "./i18n.provider.ts";
 * import {createStaticProvider} from "vayjs"
 *
 * // Render the page with the correct set of translations
 * createStaticProvider(provider).render(document.body);
 *
 * ```
 * This will translate all elements within the body that match the target attribute criteria
 * set in the provider's configuration.
 */
export const createStaticProvider = <Dict extends Record<string, Phrase>>(
    provider: VayProvider<Dict>,
): VayStaticProvider<Dict> => {
    // Processor Functions for Static Translation Provider
    const processToken = (config: ProcessConfig) => {
        const { element, key } = config;
        // The element was selected because it has a translation attribute. This should ensure that
        // get attribute will always return a token.
        const token = element.getAttribute(key) as any;
        const phrase = provider.translate(token);

        // Check if the phrase should be inserted as HTML or Text
        const insertAs = element.hasAttribute(`${key}-html`) ? 'innerHTML' : 'innerText';
        element[insertAs] = phrase;
    };

    const processAttributes = (config: ProcessConfig) => {
        const { element, key } = config;

        // Extract the full set of matching attributes
        const attributeSet = new Set([...element.getAttributeNames()].filter(filterAttributeNames(key)));

        // For each of the attributes, set the correct attribute with the
        // translated Phrase
        for (const attr in attributeSet) {
            const [, name] = attr.split('-');
            const token = element.getAttribute(attr) as any;
            element.setAttribute(name, provider.translate(token));
        }

        return attributeSet;
    };

    if (!getExecutionContext()) {
        throw new Error(`[Vay]: Static translations are only possible in a browser environment.`);
    }

    return {
        provider,
        render: (anchor: HTMLElement) => {
            const { targetAttribute, removeAttributesOnRender, ignoreAttributes, quiet } = provider.config;

            // Check if the supplied element is a HTMLElement
            if ((!anchor || !(anchor instanceof HTMLElement)) && !quiet) {
                console.warn(`[Vay]: Missing target for rendering. Provide a HTMLElement.`);
                return;
            }

            const vayNodes = Array.from(anchor.querySelectorAll(`[${targetAttribute}]`));
            for (const element of vayNodes) {
                if (element instanceof HTMLElement) {
                    processToken({ element, key: targetAttribute });

                    // check if attributes should be processed
                    if (!ignoreAttributes) {
                        const attributes = processAttributes({ element, key: targetAttribute });
                        removeAttributesOnRender && attributes.forEach(element.removeAttribute);
                    }
                }
            }
        },
    };
};
