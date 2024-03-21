/** @format */

import { defineConfig } from 'vitepress';
import { SidebarItem } from './scripts/sidebar-item';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Vay.js',
    description: 'The minimal translator',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/vay.logo.transparent.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Overview', link: '/documentation/docs/01.introduction' },
            { text: 'Get started', link: '/documentation/docs/02.getting-started' },
        ],

        sidebar: [
            new SidebarItem('/documentation/docs', 'Documentation', false),
            new SidebarItem('/documentation/recipes', 'Recipes', false),
            // Sidebar items for the custom bindings
            {
                items: [
                    {
                        text: 'Vay & React',
                        link: '/documentation/vay-react/',
                    },
                    {
                        text: 'Vay & Svelte',
                        link: '/documentation/vay-svelte/',
                    },
                    {
                        text: 'Vay & Angular',
                        link: '/documentation/vay-angular/',
                    },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/IamSebastianDev/vay.js' }],

        // Search Provider
        search: {
            provider: 'local',
        },

        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'medium',
                timeStyle: 'medium',
            },
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present Sebastian Heinz',
        },
    },
});
