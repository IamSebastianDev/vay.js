/** @format */

import { Phrase } from '@vayjs/vay';
import { ReactNode } from 'react';
import { VayContext } from './vay-context';

/**
 * Defines a structured solution for integrating Vay.js with React applications, providing components with access to internationalization functionalities.
 * This solution includes both a React context provider component and a custom hook, facilitating the use of dynamic translations
 * and language management within the React component tree.
 *
 * @template Dict A TypeScript generic extending a record of strings to `Phrase`, representing the structured dictionary for translations.
 *                This type ensures the translations and their usage throughout the application are type-safe and predictable.
 */
export type VaySolution<Dict extends Record<string, Phrase>> = {
    /**
     * A React functional component that serves as a context provider for the internationalization functionalities provided by Vay.js.
     * It should wrap the root or a specific part of your application where translation capabilities are needed, making translation
     * context available to all descendant components. This approach centralizes the translation logic, enabling consistent language
     * switching and text translation across your application.
     *
     * @param {ReactNode} children - Child components that will inherit access to the Vay.js translation context, enabling them
     *                               to perform translations and access the current language setting seamlessly. The context
     *                               provides these components with the tools needed for dynamic internationalization.
     */
    LanguageProvider: React.FC<{ children: ReactNode }>;

    /**
     * A custom React hook designed for accessing the Vay.js translation context within functional components. By using this hook,
     * components gain direct access to the functionalities necessary for performing translations, managing the application's
     * current language, and dynamically updating language settings based on user interactions or application logic.
     *
     * @returns A `VayContext<Dict>` object containing:
     *          - `translate`: A function to perform translations based on given tokens and optional data for interpolation or pluralization.
     *          - `language`: The current active language code (ISO 639-1 format), reflecting the application's current internationalization state.
     *          - `setLanguage`: A function to update the application's current language, triggering re-renders where necessary to apply the new language across the UI.
     */
    useLanguage: () => VayContext<Dict>;
};
