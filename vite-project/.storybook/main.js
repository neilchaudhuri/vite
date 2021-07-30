module.exports = {
	stories: ["../stories/**/*.stories.@(ts|tsx)"],
	addons: [
		{
			name: "@storybook/addon-essentials",
			options: {
				backgrounds: false,
			},
		},
		{
			name: "@storybook/addon-a11y",
			options: {},
		},
	],
	webpackFinal: async config => {
		const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test(".svg"))
		fileLoaderRule.exclude = /\.svg$/

		config.module.rules.push({
			test: /\.svg$/,
			enforce: "pre",
			loader: require.resolve("@svgr/webpack"),
		})

		return config
	},
}
