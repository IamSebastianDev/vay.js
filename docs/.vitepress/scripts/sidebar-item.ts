/** @format */

import { DefaultTheme } from 'vitepress';
import { readdirSync, Dirent } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { capitalize } from './capitalize.util';

export class SidebarItem implements DefaultTheme.SidebarItem {
    private format(text: string) {
        return capitalize(text.replace('.md', ''));
    }

    private entries: Dirent[] = [];
    items: DefaultTheme.SidebarItem[] = [];
    link: string | undefined = undefined;

    constructor(
        public readonly base: string,
        public readonly text: string,
        public readonly collapsed: boolean | undefined = false,
    ) {
        const root = resolve(join(process.cwd(), this.base));
        this.entries = readdirSync(root, { withFileTypes: true, encoding: 'utf-8' });

        // Get the sidebar items
        for (const entry of this.entries) {
            // If the entry is a directory, recursively convert it to a SidebarItem
            if (entry.isDirectory()) {
                this.items.push(new SidebarItem(join(this.base, entry.name), this.format(entry.name), true));
            }

            // If the entry is a file, parse the file into a
            // Sidebar item by inferring and formatting the name
            // as well as the correct path, as long as it is no index.md
            if (entry.isFile() && extname(entry.name) === '.md' && !entry.name.endsWith('index.md')) {
                this.items.push({
                    text: this.format(entry.name),
                    link: `/${entry.name}`,
                    items: [],
                });
            }
        }
        // Handle index.md case
        if (this.entries.find(({ name }) => name.endsWith('index.md'))) {
            this.link = '/';
        }

        if (this.items.length === 0) {
            this.collapsed = undefined;
        }
    }
}
