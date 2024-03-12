/** @format */

export default {
    async load() {
        return {
            dependencies: [
                {
                    name: 'AdminBusinessLineChangelog',
                    link: '/docs/a',
                    dependencies: ['B', 'C'],
                    dependents: ['D'],
                },
                {
                    name: 'B',
                    dependencies: [],
                    dependents: ['AdminBusinessLineChangelog'],
                },
                {
                    name: 'C',
                    dependencies: [],
                    dependents: ['AdminBusinessLineChangelog'],
                },
                {
                    name: 'D',
                    dependencies: ['AdminBusinessLineChangelog'],
                    dependents: [],
                },
            ],
        };
    },
};
