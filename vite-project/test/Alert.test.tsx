import React from "react"
import { screen, getByText, getByRole } from "@testing-library/react"
import { Alerts, AlertMessage } from "../src/Alert"
import { Link as ReachLink } from "@reach/router"
import { LinkProps } from "../src"
import { renderWithTheme } from "./wrapperUtils"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"

const readMore: LinkProps = { as: ReachLink, to: "/" }

test("Alert basic warning display works", () => {
	const alerts: AlertMessage[] = [
		{
			status: "warning",
			message: "System Maintenance will occur today between 3:00 PM - 4:00 PM ET.",
		},
    ]

	renderWithTheme(<Alerts messages={alerts} readMore={readMore} />)
    
    const alert = screen.getByRole("alert")

    expect(getByText(alert, /System Maintenance/, {exact: false})).toBeInTheDocument()
    expect(alert).toHaveStyle({
        backgroundColor: "rgb(254, 230, 133)"
    })
})

test("Alert basic error display works", () => {
	const alerts: AlertMessage[] = [
		{
			status: "error",
			message: "Emergency evacuation of downtown in effect.",
		},
    ]

	renderWithTheme(<Alerts messages={alerts} readMore={readMore} />)
    
    const alert = screen.getByRole("alert")

    expect(getByText(alert, /Emergency evacuation/, {exact: false})).toBeInTheDocument()
    expect(alert).toHaveStyle({
        backgroundColor: "rgb(193, 2, 48)"
    })
})

test("Alert multiple display works", () => {
	const alerts: AlertMessage[] = [
		{
			status: "warning",
			message: "System Maintenance will occur today between 3:00 PM - 4:00 PM ET.",
		},
		{
			status: "error",
			message: "System Maintenance will occur next Wednesday between 12:00 PM - 4:00 PM ET.",
		},
	]

	renderWithTheme(<Alerts messages={alerts} readMore={readMore} />)
    
    let alert = screen.getByRole("alert")

    expect(getByText(alert, /System Maintenance will occur today/, {exact: false})).toBeInTheDocument()
    expect(alert).toHaveStyle({
        backgroundColor: "rgb(254, 230, 133)"
    })

    userEvent.click(getByRole(alert, "button", { name: "Show previous alert"}))
    alert = screen.getAllByRole("alert")[1]
    expect(getByText(alert, /System Maintenance will occur next Wednesday/, {exact: false})).toBeInTheDocument()
    expect(alert).toHaveStyle({
        backgroundColor: "rgb(193, 2, 48)"
    })

    userEvent.click(getByRole(alert, "button", { name: "Show next alert"}))
    alert = screen.getAllByRole("alert")[0]
    expect(getByText(alert, /System Maintenance will occur today/, {exact: false})).toBeInTheDocument()
    expect(alert).toHaveStyle({
        backgroundColor: "rgb(254, 230, 133)"
    })
})
