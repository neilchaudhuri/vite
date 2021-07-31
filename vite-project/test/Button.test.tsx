import React from "react"
import { screen } from "@testing-library/react"
import { Button } from "../src/Button"
import { renderWithTheme, renderWithDarkTheme } from "./wrapperUtils"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { DateRangeSharp } from "@material-ui/icons"
import { IconAlignment } from "../src/Icon"

test("Button primary display works", () => {
    const onClickMock = jest.fn()
    
    renderWithTheme(<Button onClick={onClickMock}>Primary</Button>)
    
    const button = screen.getByRole("button", { name: "Primary" })

    userEvent.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(button).toHaveStyle({
        backgroundColor: "rgb(0, 113, 188)"
    })
})

test("Button primary dark display works", () => {
    renderWithDarkTheme(<Button>Primary Dark</Button>)
    
    const button = screen.getByRole("button", { name: "Primary Dark" })

    expect(button).toHaveStyle({
        backgroundColor: "rgb(255, 255, 255)"
    })
})

test("Button secondary display works", () => {
    renderWithTheme(<Button buttonType="secondary" size="sm">Secondary</Button>)
    
    const button = screen.getByRole("button", { name: "Secondary" })

    expect(button).toHaveStyle({
        backgroundColor: "transparent"
    })
})

test("Button secondary dark display works", () => {
    renderWithTheme(<Button buttonType="secondary" size="sm">Secondary Dark</Button>)
    
    const button = screen.getByRole("button", { name: "Secondary Dark" })

    expect(button).toHaveStyle({
        backgroundColor: "transparent"
    })
})

test("Button leading icon display works", () => {
    renderWithTheme(<Button buttonIcon={{ mdIcon: DateRangeSharp, alignment: IconAlignment.LEFT }}>Leading Icon</Button>)
    
    const button = screen.getByRole("button", { name: "Leading Icon" })

    expect(button.firstChild?.nodeName).toBe("svg")
})

test("Button trailing icon display works", () => {
    renderWithTheme(<Button buttonIcon={{ mdIcon: DateRangeSharp, alignment: IconAlignment.RIGHT }}>Trailing Icon</Button>)
    
    const button = screen.getByRole("button", { name: "Trailing Icon" })

    expect(button.lastChild?.nodeName).toBe("svg")
})

test("Disabled button cannot be clicked", () => {
    const onClickMock = jest.fn()
    
    renderWithTheme(<Button disabled onClick={onClickMock}>Disabled</Button>)
    
    const button = screen.getByRole("button", { name: "Disabled" })

    userEvent.click(button)
    expect(onClickMock).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
})
