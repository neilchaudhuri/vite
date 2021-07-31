import React from "react"
import { screen } from "@testing-library/react"
import { renderWithTheme } from "./wrapperUtils"
import userEvent from "@testing-library/user-event"
import { Box } from "@chakra-ui/core"
import { Settings } from "@material-ui/icons"
import { Tooltip } from "../src/Tooltip"
import "@testing-library/jest-dom"

test("hover appears with correct style", async () => {
	renderWithTheme(
		<Tooltip text="Default Tooltip">
			<Box as={Settings} color="clickable" size="iconMd" aria-label="Settings" />
		</Tooltip>
	)

	userEvent.hover(screen.getByLabelText(/Settings/i))
	expect(await screen.findAllByText("Default Tooltip")).toHaveLength(2)
	expect(screen.getByRole("tooltip", { name: "Default Tooltip" })).toBeInTheDocument()
})

test("hover appears with correct label", async () => {
	renderWithTheme(
		<Tooltip text="Labeled Tooltip" ariaLabel="Tooltip label">
			<Box as={Settings} color="clickable" size="iconMd" aria-label="Settings" />
		</Tooltip>
	)

	userEvent.hover(screen.getByLabelText(/Settings/i))
	expect(await screen.findByRole("tooltip", { name: "Tooltip label" })).toBeInTheDocument()
	expect(screen.getByText("Labeled Tooltip")).toBeInTheDocument()
})
