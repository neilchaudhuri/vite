import React from "react"
import { Banner, useBanner } from "../src/Banner"
import { ThemeProvider } from "@chakra-ui/core"
import { Button } from "../src/Button"
import { Link } from "../src/Link"
import theme from "../theme.js"
import { actions } from "@storybook/addon-actions"

export default {
	title: "Banner",
	component: Banner,
}

export const successBanner = () => {
	const banner = (
		<Banner status="success" title="Success!" onClose={() => console.log("Banner closed")}>
			Account Profile has been successfully updated.
		</Banner>
	)
	const b = useBanner(banner)
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Banner</Button>
		</ThemeProvider>
	)
}

export const warningBanner = () => {
	const banner = (
		<Banner status="warning" title="Warning">
			There is unusually high call volume at this time. If this request isn't urgent, you can read out FAQ at{" "}
			<Link href="https://www.google.com">travel.state.gov</Link>
		</Banner>
	)
	const b = useBanner(banner)
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Banner</Button>
		</ThemeProvider>
	)
}

export const errorBanner = () => {
	const banner = (
		<Banner status="error" title="Oops! Something went wrong">
			We encountered an error while processing your request. Please try again later. If this problem persists, contact your
			Help Desk
		</Banner>
	)
	const b = useBanner(banner)
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Banner</Button>
		</ThemeProvider>
	)
}

export const infoBanner = () => {
	const banner = (
		<Banner status="info" title="Information">
			You've signed up to receive travel and crisis notifications for Venezuela. Manage your notification settings.
		</Banner>
	)
	const b = useBanner(banner)
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Banner</Button>
		</ThemeProvider>
	)
}

export const tryItOut = args => {
	const { children, ...rest } = args
	const banner = <Banner {...rest}>{children}</Banner>
	const b = useBanner(banner)

	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Banner</Button>
		</ThemeProvider>
	)
}
tryItOut.args = { children: "Try It Out", title: "Try out a warning", status: "warning" }
tryItOut.argTypes = {
	onClose: { action: "closed", control: { disable: true } },
}
