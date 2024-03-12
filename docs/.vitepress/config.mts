/** @format */

import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Vay.js',
    description: 'The minimal translator',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: 'Home', link: '/' }],

        sidebar: [
            {
                text: '',
                items: [],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/IamSebastianDev/vay.js' }],
    },
});
