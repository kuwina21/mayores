import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: '../../../public/mini-projects/album',
			assets: '../../../public/mini-projects/album',
			fallback: null,
			precompress: false,
			strict: false
		}),
		prerender: {
			handleHttpError: 'ignore',
			handleUnseenRoutes: 'ignore'
		}
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules') ? undefined : { runes: true }
	}
};

export default config;
