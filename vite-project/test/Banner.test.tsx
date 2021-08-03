import React from "react"
import { screen, getByText, getByRole } from "@testing-library/react"
import { Button } from "../src/Button"
import { renderWithTheme } from "./wrapperUtils"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
// @ts-ignore
import theme from "./theme"
import { useToast } from "@chakra-ui/core"

jest.doMock("../theme.js", () => ({
	default: theme,
}))
import { Banner, useBanner } from "../src/Banner"

jest.mock("@chakra-ui/core", () => {
	const originalChakra = jest.requireActual("@chakra-ui/core")
	return {
		...originalChakra,
		useToast: jest.fn().mockImplementation(() => {
			const originalToast = originalChakra.useToast()
			const noCloseToast: ReturnType<typeof useToast> = p => {
				originalToast({
					...p,
					onClose: () => {
						// Do not execute onClose which triggers uncaught promise exception
					},
					render: renderProps => {
						return p.render
							? p.render({
									...renderProps,
									onClose: () => {
										// Do not execute onClose which triggers uncaught promise exception
									},
							  })
							: null
					},
				})
			}

			return noCloseToast
		}),
	}
})

interface BannerWrapperProps {
	banner: React.ReactElement<React.ComponentProps<typeof Banner>>
}
const BannerWrapper = (p: BannerWrapperProps) => {
	const showBanner = useBanner(p.banner)

	return <Button onClick={() => showBanner()}>Show Banner</Button>
}

test("Success banner display works", () => {
	const onClickMock = jest.fn()
	const b = (
		<Banner status="success" title="Success!" onClose={onClickMock}>
			This is a success message.
		</Banner>
	)

	renderWithTheme(<BannerWrapper banner={b} />)

	userEvent.click(screen.getByRole("button", { name: "Show Banner" }))

	const banner = screen.getByRole("alert")
	const heading = getByRole(banner, "heading", { name: "Success!" })

	expect(banner).toHaveStyle({
		backgroundColor: "rgb(0, 131, 62)",
	})
	expect(heading).toBeInTheDocument()
	expect(getByText(banner, /This is a success message/)).toBeInTheDocument()

	userEvent.click(getByRole(banner, "button", { name: "Close" }))
	expect(onClickMock).toHaveBeenCalledTimes(1)
})

test("Warning banner display works", () => {
	const b = (
		<Banner status="warning" title="Warning">
			This is a warning message.
		</Banner>
	)

	renderWithTheme(<BannerWrapper banner={b} />)

	userEvent.click(screen.getByRole("button", { name: "Show Banner" }))

	const banner = screen.getAllByRole("alert")[0]
	const heading = getByRole(banner, "heading", { name: "Warning" })

	expect(banner).toHaveStyle({
		backgroundColor: "rgb(254, 230, 133)",
	})
	expect(heading).toBeInTheDocument()
	expect(getByText(banner, /This is a warning message/)).toBeInTheDocument()

	userEvent.click(getByRole(banner, "button", { name: "Close" }))
})

test("Error banner display works", () => {
	const b = (
		<Banner status="error" title="Error">
			This is an error message.
		</Banner>
	)

	renderWithTheme(<BannerWrapper banner={b} />)

	userEvent.click(screen.getByRole("button", { name: "Show Banner" }))

	const banner = screen.getAllByRole("alert")[0]
	const heading = getByRole(banner, "heading", { name: "Error" })

	expect(banner).toHaveStyle({
		backgroundColor: "rgb(208, 19, 25)",
	})
	expect(heading).toBeInTheDocument()
	expect(getByText(banner, /This is an error message/)).toBeInTheDocument()

	userEvent.click(getByRole(banner, "button", { name: "Close" }))
})

test("Information banner display works", () => {
	const b = (
		<Banner status="info" title="Information" onClose={() => console.log("Closed")}>
			This is an info message.
		</Banner>
	)

	renderWithTheme(<BannerWrapper banner={b} />)

	userEvent.click(screen.getByRole("button", { name: "Show Banner" }))

	const banner = screen.getAllByRole("alert")[0]

	expect(banner).toHaveStyle({
		backgroundColor: "rgb(32, 84, 147)",
	})
	expect(getByText(banner, /This is an info message/)).toBeInTheDocument()

	// try {
	userEvent.click(getByRole(banner, "button", { name: "Close" }))
	// } catch (err) {
	// 	expect(err).toEqual(new Error())
	// }
})
