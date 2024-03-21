---
outline: deep
---

<!-- @format -->

# Using Vay with Angular

[Angular](https://angular.dev) makes it hard to correctly integrate a strongly typed provider on a library level. However, integrating Vay yourself is fairly straight forward and requires only a service and a pipe.

## Structuring the Project

Create a new directory `i18n` inside your core directory / module. This directory will hold the service, as well as the provider and the dictionaries. Below you'll see a suggestion on how your setup might look like.

```sh
core
├─ localization
│  └─ core.localization.en.ts # A localization file
├─ services
│  ├─ i18n
│  │  ├─ i18n.dictionary.en.ts # A dictionary file
│  │  ├─ i18n.provider.ts # The provider
│  │  └─ i18n.service.ts # The service
│  └─ <other services>
├─ pipes
│  ├─ translation.pipe.ts # The pipe used for translating
│  └─ <other pipes>
└─ <other code>
```

::: info
You are free to structure your code as you like and as your project requires, the structure presented here is just a suggestion and best practice learnt form sizeable projects.
:::

There are 5 main building blocks used in this structure.

-   **Localization files**: (`<domain>.localization.<lang>.ts`) Used for breaking down large dictionaries into domain specific sizeable chunks, that can be easily maintained.
-   **Dictionary files**: (`<domain>.dictionary.<lang>.ts`) Used to collect all localization files, and integrate them into the Vay dictionary system.
-   **The Provider**: (`services/i18n/i18n.provider.ts`) The configured Provider that will be used inside the service.
-   **The Service**: (`services/i18n/i18n.service.ts`) A Angular service that handles locale selection as well as translating.
-   **The Pipe**: (`pipes/translation.pipe.ts`) A Angular pipe used to translate tokens to phrases.

## Providers, Dictionaries and localizations

You can setup Vay as describes in the [getting started](../docs/02.getting-started.md) section.

-   Create a file for the `Dictionary` and `localizations` you want to use:

::: code-group

```ts [./i18n.dictionary.en.ts]
import { defineDictionary } from '@vayjs/vay';
import core from '../localizations/core.localization.en';

export default defineDictionary('en', {
    core, // Add the localization object to the dictionary.
});
```

```ts [./core.localization.en.ts]
export default {
    greeting: 'Hello, Vay & Angular.',
};
```

:::

-   Create the `Provider`:

::: code-group

```ts [./i18n.provider.ts]
import { createProvider, defineConfig, getDefaultBrowserLanguage } from '@vayjs/vay';
import dict_en from './i18n.dictionary.en';

export const provider = createProvider(
    // Configure the provider as desired
    defineConfig({ defaultLocale: getDefaultBrowserLanguage() }),
    // Add the dictionaries you created
    dict_en,
);
```

:::

## The `I18nService`

The core element of Vay's Angular integration is the `I18nService`. The service controls the set locale, methods to set the locale as well as holding the translation method that will be used by the pipe later.

::: code-group

```ts [./i18n.service.ts]
import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { ISO639Code } from '@vayjs/vay';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { provider } from './i18n.provider';

@Injectable({
    providedIn: 'root',
})
export class I18nService implements OnDestroy {
    private terminated = new EventEmitter();
    private readonly provider = provider;

    // The current locale
    private readonly _locale = new BehaviorSubject(this.provider.getLanguage());
    public locale$ = this._locale.asObservable();

    constructor() {
        // Subscribe to the locale to the set the language of the provider accordingly
        this._locale.pipe(takeUntil(this.terminated.asObservable())).subscribe((locale) => {
            this.provider?.setLanguage(locale);
        });
    }

    // Reassign the translate method
    translate = this.provider.translate;

    setLanguage(locale: ISO639Code) {
        // Change the locale if it has changed
        if (this._locale.value !== locale) {
            this._locale.next(locale);
        }
    }

    getLanguage() {
        return this._locale.value;
    }

    ngOnDestroy() {
        this.terminated.emit();
    }
}
```

:::

The Service is a simple wrapper for Vay's functionality. You can extend it in any way you like.

## The Pipe

The pipe is then finally used to transform the tokens into a corresponding phrase. As Angular's pure pipes are memoized by default, (meaning no rerenders on locale change), we need to use a impure pipe and implement the memoization part by ourself.

::: code-group

```ts [./pipes/translate.pipe.ts]
import { Pipe, inject, type PipeTransform, EventEmitter, OnDestroy } from '@angular/core';
import { I18nService } from './i18n.service';
import { takeUntil } from 'rxjs';

@Pipe({
    // You can choose any name you want. We choose `t` because it's short.
    name: 't',
    // The pipe cannot be pure, as the input parameters won't change.
    // We implement the memoization for performance improvements ourself.
    pure: false,
    // Depending on your setup, you might want to change this to false.
    standalone: true,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
    private readonly terminated = new EventEmitter();
    private readonly i18nProvider = inject(I18nService);

    // Set up the properties used for memoization
    private dirty = true;
    private phrase: string | null = null;
    private memoized: string = '[]';

    constructor() {
        // Subscribe to the locale to set the pipe to dirty.
        this.i18nProvider.locale$.pipe(takeUntil(this.terminated.asObservable())).subscribe(() => {
            this.dirty = true;
        });
    }

    // The method will return true if the pipe should rerender
    // Either because there is no phrase, the locale has changed,
    // or the arguments have changed.
    private isDirty(args: Parameters<(typeof this.i18nProvider)['translate']>) {
        const serialized = JSON.stringify(args);

        if (serialized !== this.memoized) {
            this.memoized = serialized;
            return true;
        }

        return this.dirty || this.phrase === null;
    }

    transform(...args: Parameters<(typeof this.i18nProvider)['translate']>) {
        // Check if the pipe can return the stored phrase or needs
        // to recalculate the phrase
        if (!this.isDirty(args)) {
            return this.phrase;
        }

        // Translate the token and store the phrase
        this.phrase = this.i18nProvider.translate(...args);
        this.dirty = false;

        return this.phrase;
    }

    ngOnDestroy(): void {
        this.terminated.emit();
    }
}
```

:::

## Using the `I18nService`

The service can be used to control the locale. A simple setup could look like this:

::: code-group

```ts [./language-selector.component.ts]
@Component({
    // Component meta data
})
export class LanguageComponent {
    i18nService = inject(I18nService);

    // Method to change the locale
    setLanguage(locale: ISO639Code) {
        this.i18nService.setLanguage(locale);
    }

    // Extract the locale$ Observable from the service
    locale$ = this.i18nService.locale$;
}
```

```html [./language-selector.component.html]
<div>
    <!-- Create buttons to change the language -->
    <button (click)="setLanguage('en')">EN</button>
    <button (click)="setLanguage('es')">ES</button>
    <!-- Display the current locale -->
    <span>{{ locale$ | async }}</span>
</div>
```

:::

## Using the `TranslatePipe`

With all elements created it's time to use the created pipe in one of our components. Generally speaking, there will be two different locations where you'll want to use the pipe. Classes and Templates.

### Classes

You can use the pipe by directly injecting it into your component.

```ts
@Component({
    // component meta data
})
export class LanguageComponent {
    // Inject the pipe into your component
    translate = inject(TranslatePipe);

    // Use the pipe to translate a token
    greeting = this.translate(`core.greeting`);
}
```

### Templates

Using the pipe inside a template is straightforward, and works like using all other pipes. You can pass additional data to the pipe as usual. The strongly typed character should be preserved, making Vay a valuable part of your Angular application.

::: code-group

```html [./language.component.html]
<div [title]="'core.greeting' | t">{{ 'core.greeting' | t }}</div>
```

```ts [./language.component.ts]
@Component({
    // Import the pipe if it's standalone, otherwise the module will handle it.
    imports: [TranslatePipe],
})
export class LanguageComponent {
    // Logic
}
```

:::

## Best practices

-   **Keep your localization files with your pages / components**: This allows you to find and update phrases easier in case of requirement changes.
-   **Keep your localization files small**: The larger the file, the harder it gets to maintain. In larger applications, maintainability is the key to sustained growth
-   **Namespace your Localization files per module**: Giving your tokens a semantic structure makes it easier to infer tokens.
-   **Interpolation Mechanism**: Vay's usual interpolation, pluralization and contextualization mechanisms work the same way in angular as they do in vanilla JavaScript. Use them to your advantage.
