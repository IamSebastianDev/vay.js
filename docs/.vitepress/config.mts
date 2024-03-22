/** @format */

import { defineConfig } from 'vitepress';
import { SidebarItem } from './scripts/sidebar-item';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Vay.js',
    description: 'The minimal translator',
    head: [
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }],
        ['link', { rel: 'manifest', href: '/favicons/site.webmanifest' }],
        ['link', { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#3a0839' }],
        ['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
        ['meta', { name: 'msapplication-TileColor', content: '#3a0839' }],
        ['meta', { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }],
        ['meta', { name: 'theme-color', content: '#fef6e0' }],
    ],
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
                        text: 'Vay & Nørd',
                        link: '/documentation/vay-nord/',
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
