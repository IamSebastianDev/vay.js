/** @format */

import { Phrase, VayProvider } from '@vayjs/vay';
import React, { ReactNode, createContext, useCallback, useMemo } from 'react';
import { VayContext } from '../types/vay-context';
import { VaySolution } from '../types/vay-solution';
import { useLanguageContext } from '../hooks/use-language-context';
import { useLanguage } from '../hooks/use-language';

/**
 * Creates a React context and provider for managing language settings and translations within a React application,
 * leveraging a Vay.js `VayProvider` instance. This setup abstracts the complexity of integrating Vay.js for internationalization,
 * offering an easy and efficient way to provide translation capabilities across your React application.
 *
 * By encapsulating the language management logic within a React context, this approach allows components throughout
 * your application to access and use translation functions and language settings seamlessly.
 *
 * @template Dict A TypeScript generic extending a record of strings to `Phrase`, representing the structure of your translation dictionaries.
 *                This ensures type safety and IntelliSense support when defining and accessing translations.
 * @param {VayProvider<Dict>} provider An initialized VayProvider instance, pre-configured with your translation dictionaries
 *                                     and any necessary initial settings (e.g., the default locale).
 * @returns A `VaySolution` tuple containing two elements:
 *          1. `LanguageProvider`: A React functional component that acts as a Context Provider. It should wrap the part of
 *             your React application that needs access to translation capabilities. This provider makes the current language,
 *             the translation function, and a method to change the language available to all child components.
 *          2. `useLanguage`: A custom hook that components can use to access the current language, change the language, and
 *             perform translations using the provided `VayProvider` instance.
 *
 * @example
 * // Setup:
 * // Assume `vayProvider` is an instance of VayProvider initialized with your translation dictionaries.
 * const { LanguageProvider, useLanguage } = createLanguageProvider(vayProvider);
 *
 * // In your application's root component:
 * function App() {
 *   return (
 *     <LanguageProvider>
 *       <MainComponent />
 *     </LanguageProvider>
 *   );
 * }
 *
 * // In any child component that needs to perform translations:
 * function GreetingComponent() {
 *   const { translate: t, language, setLanguage } = useLanguage();
 *   return (
 *     <div>
 *       {t('greeting', { name: 'World' })} // Utilizes the 'translate' function to retrieve a translated string.
 *       <button onClick={() => setLanguage('es')}>Switch to Spanish</button> // Changes the current language.
 *     </div>
 *   );
 * }
 */

export const createLanguageProvider = <Dict extends Record<string, Phrase>>(
    provider: VayProvider<Dict>,
): VaySolution<Dict> => {
    const Ctx = createContext<VayContext<Dict> | null>(null);

    const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const [language, setLanguage] = useLanguage(provider);
        const translate = useCallback(provider.translate, [language]);

        const value = useMemo(
            () => ({
                translate,
                language,
                setLanguage,
            }),
            [translate, language, setLanguage],
        );

        return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
    };

    return {
        LanguageProvider,
        useLanguage: useLanguageContext(Ctx),
    };
};
