import React from "react"
import { screen } from "@testing-library/react"
import { Header } from "../src/Header"
import { renderWithTheme } from "./wrapperUtils"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"

const links = [
	{
		label: "U.S. Passport",
		href: "https://travel.state.gov/content/travel/en/passports.html",
	},
	{
		label: "U.S. Visa",
		href: "https://travel.state.gov/content/travel/en/us-visas.html",
	},
	{
		label: "Intercountry Adoption",
		href: "https://travel.state.gov/content/travel/en/Intercountry-Adoption.html",
	},
	{
		label: "International Child Abduction",
		href: "https://travel.state.gov/content/travel/en/International-Parental-Child-Abduction.html",
	},
]

test("Header basic display works", () => {
	const unauthenticatedUser = {
		createAccount: jest.fn(),
		signIn: jest.fn()
	}

	renderWithTheme(<Header user={unauthenticatedUser} />)
    
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "MyTravelGov"}))

    expect(screen.getByRole("link", { name: "Travel Advisories"}))
        .toHaveAttribute("href", "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html")

    expect(screen.getByRole("link", { name: "Newsroom"}))
        .toHaveAttribute("href", "https://travel.state.gov/content/travel/en/News/newsroom.html")

    expect(screen.getByRole("link", { name: "About Us"}))
        .toHaveAttribute("href", "https://travel.state.gov/content/travel/en/about-us.html")

    expect(screen.getByRole("link", { name: "Find U.S. Embassies & Consulates"}))
        .toHaveAttribute("href", "http://www.usembassy.gov/")
})

test("Header link display works", () => {
	const unauthenticatedUser = {
		createAccount: jest.fn(),
		signIn: jest.fn()
	}

	renderWithTheme(<Header user={unauthenticatedUser} navbarLinks={links} />)
    
    expect(screen.getByRole("link", { name: "U.S. Passport"}))
        .toHaveAttribute("href", "https://travel.state.gov/content/travel/en/passports.html")

    expect(screen.getByRole("link", { name: "U.S. Visa"}))
        .toHaveAttribute("href", "https://travel.state.gov/content/travel/en/us-visas.html")

    expect(screen.getByRole("link", { name: "Intercountry Adoption"}))
        .toHaveAttribute("href", "https://travel.state.gov/content/travel/en/Intercountry-Adoption.html")

    expect(screen.getByRole("link", { name: "International Child Abduction"}))
        .toHaveAttribute("href", "https://travel.state.gov/content/travel/en/International-Parental-Child-Abduction.html")
})

test("Header site name works", () => {
	const unauthenticatedUser = {
		createAccount: jest.fn(),
		signIn: jest.fn()
	}

	renderWithTheme(<Header siteName={"Test Title"} user={unauthenticatedUser} />)
    
    expect(screen.getByRole("heading", { name: "Test Title"}))
})

test("Header unauthenticated display is correct", () => {
    const createAccountMock = jest.fn()
    const signInMock = jest.fn()
	const unauthenticatedUser = {
		createAccount: createAccountMock,
		signIn: signInMock
	}

    renderWithTheme(<Header user={unauthenticatedUser} />)
    
    const signInLink = screen.getByText(/Sign In/)
    const createAccountLink = screen.getByText(/Create Account/)

    expect(signInLink).toBeInTheDocument()
    expect(createAccountLink).toBeInTheDocument()

    userEvent.click(signInLink)
    expect(signInMock).toBeCalledTimes(1)
    
    userEvent.click(createAccountLink)
    expect(createAccountMock).toBeCalledTimes(1)
})

test("Header authenticated display is correct", async () => {
    const changePasswordMock = jest.fn()
    const editAccountMock = jest.fn()
    const signOutMock = jest.fn()
	const authenticatedUser = {
        name: "John Smith",
        changePassword: changePasswordMock,
		editAccount: editAccountMock,
		signOut: signOutMock,
	}

    renderWithTheme(<Header user={authenticatedUser} />)
    
    const userMenuButton = screen.getByRole("button", { name: "Open account menu for John Smith"})
    userEvent.click(userMenuButton)

    const changePasswordButton = await screen.findByText(/Change Password/)
    userEvent.click(changePasswordButton)
    expect(changePasswordMock).toBeCalledTimes(1)

    const editAccountButton = await screen.findByText(/Edit Account/)
    userEvent.click(editAccountButton)
    expect(editAccountMock).toBeCalledTimes(1)

    const signOutButton = await screen.findByText(/Sign Out/)
    userEvent.click(signOutButton)
    expect(signOutMock).toBeCalledTimes(1)
})

// test("Alert basic error display works", () => {
// 	const alerts: AlertMessage[] = [
// 		{
// 			status: "error",
// 			message: "Emergency evacuation of downtown in effect.",
// 		},
//     ]

// 	renderWithTheme(<Alerts messages={alerts} readMore={readMore} />)
    
//     const alert = screen.getByRole("alert")

//     expect(getByText(alert, /Emergency evacuation/, {exact: false})).toBeInTheDocument()
//     expect(alert).toHaveStyle({
//         backgroundColor: "rgb(193, 2, 48)"
//     })
// })

// test("Alert multiple display works", () => {
// 	const alerts: AlertMessage[] = [
// 		{
// 			status: "warning",
// 			message: "System Maintenance will occur today between 3:00 PM - 4:00 PM ET.",
// 		},
// 		{
// 			status: "error",
// 			message: "System Maintenance will occur next Wednesday between 12:00 PM - 4:00 PM ET.",
// 		},
// 	]

// 	renderWithTheme(<Alerts messages={alerts} readMore={readMore} />)
    
//     let alert = screen.getByRole("alert")

//     expect(getByText(alert, /System Maintenance will occur today/, {exact: false})).toBeInTheDocument()
//     expect(alert).toHaveStyle({
//         backgroundColor: "rgb(254, 230, 133)"
//     })

//     userEvent.click(getByRole(alert, "button", { name: "Show previous alert"}))
//     alert = screen.getAllByRole("alert")[1]
//     expect(getByText(alert, /System Maintenance will occur next Wednesday/, {exact: false})).toBeInTheDocument()
//     expect(alert).toHaveStyle({
//         backgroundColor: "rgb(193, 2, 48)"
//     })

//     userEvent.click(getByRole(alert, "button", { name: "Show next alert"}))
//     alert = screen.getAllByRole("alert")[0]
//     expect(getByText(alert, /System Maintenance will occur today/, {exact: false})).toBeInTheDocument()
//     expect(alert).toHaveStyle({
//         backgroundColor: "rgb(254, 230, 133)"
//     })
// })
