// Custom matcher for date equality with Jasmine
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sameDateAs = (date: Date) => {
	return {
		asymmetricMatch: (compareTo: Date) => {
			return date.getMilliseconds() === compareTo.getMilliseconds()
		},

		jasmineToString: () => {
			return `Same date as ${date.toUTCString()}`
		},
	}
}
