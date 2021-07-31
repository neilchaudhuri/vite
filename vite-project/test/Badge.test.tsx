import React from "react"
import { screen } from "@testing-library/react"
import Badge from "../src/Badge"
import { renderWithTheme } from "./wrapperUtils"
import "@testing-library/jest-dom"
import { NotificationsActiveSharp } from "@material-ui/icons"

test("Badge basic display works", () => {

	renderWithTheme(<Badge />)
})

test("Badge display with single digit count works", () => {
    renderWithTheme(<Badge icon={{ mdIcon: NotificationsActiveSharp }} count={8} />)

    const badge = screen.getByText(/8/)

    expect(badge).toHaveStyle({
        backgroundColor: "rgb(208, 19, 25)"
    })
})

test("Badge display with dobule digit count works", () => {
    renderWithTheme(<Badge count={15} icon={{ mdIcon: NotificationsActiveSharp, color: "monza" }} />)

    const badge = screen.getByText(/15/)

    expect(badge).toHaveStyle({
        backgroundColor: "rgb(208, 19, 25)"
    })
})

test("Badge display with large count works", () => {
    renderWithTheme(<Badge count={280} />)

    const badge = screen.getByText(/99\+/)

    expect(badge).toHaveStyle({
        backgroundColor: "rgb(208, 19, 25)"
    })
})

test("Badge display with single digit count works", () => {
    renderWithTheme(<Badge count={8} color="clickable" />)

    const badge = screen.getByText(/8/)

    expect(badge).toHaveStyle({
        backgroundColor: "rgb(0, 113, 188)"
    })
})
