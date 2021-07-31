import React from "react"
import { fireEvent, screen } from "@testing-library/react"
import { TimePicker } from "../src/TimePicker"
import { utcToZonedTime } from "date-fns-tz"
import { renderWithTheme } from "./wrapperUtils"
import { sameDateAs } from "./testUtils"
import userEvent from "@testing-library/user-event"

test("sets west coast time according to user input", () => {
	const onChange = jest.fn()

	renderWithTheme(<TimePicker labelText="TimePicker" id="timePickerId" value={new Date("01/01/2000")} onChange={onChange} />)

	userEvent.type(screen.getByRole("textbox", { name: "TimePicker" }), "2:00 PM")
	fireEvent.change(screen.getByRole("textbox", { name: "Time Zone" }), {
		target: { value: "GMT -8 (Los Angeles, Seattle)" },
	})

	expect(onChange).toHaveBeenCalledWith(sameDateAs(utcToZonedTime(Date.parse("01/01/2000 02:00:00"), "America/Los_Angeles")))
})

test("sets Tokyo time according to user input", () => {
	const onChange = jest.fn()

	renderWithTheme(<TimePicker labelText="TimePicker" id="timePickerId" value={new Date("01/01/2000")} onChange={onChange} />)

	userEvent.type(screen.getByRole("textbox", { name: "TimePicker" }), "4:00 PM")
	fireEvent.change(screen.getByRole("textbox", { name: "Time Zone" }), {
		target: { value: "GMT +9 (Pyongyang, Seoul, Tokyo)" },
	})

	expect(onChange).toHaveBeenCalledWith(sameDateAs(utcToZonedTime(Date.parse("01/01/2000 04:00:00"), "Asia/Tokyo")))
})
