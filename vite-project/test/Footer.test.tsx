import React from "react"
import { screen } from "@testing-library/react"
import { Footer } from "../src/Footer"
import { renderWithTheme } from "./wrapperUtils"
import "@testing-library/jest-dom"

test("Footer links are correct", () => {
	renderWithTheme(<Footer />)
    
    expect(screen.getByRole("link", { name: "Privacy Policy"}))
        .toHaveAttribute("href", "https://www.state.gov/privacy-policy/")
    
    expect(screen.getByRole("link", { name: "Copyright and Disclaimer"}))
        .toHaveAttribute("href", "https://travel.state.gov/content/travel/en/copyright-disclaimer.html")
    
    expect(screen.getByRole("link", { name: "Freedom of Information Act (FOIA)"}))
        .toHaveAttribute("href", "https://foia.state.gov/")

    expect(screen.getByRole("link", { name: "No FEAR Act Data"}))
        .toHaveAttribute("href", "https://www.state.gov/key-topics-office-of-civil-rights/eeo-no-fear-act-whistleblower-protection-acts/")

    expect(screen.getByRole("link", { name: "Office of the Inspector General"}))
        .toHaveAttribute("href", "https://www.stateoig.gov/")

    expect(screen.getByRole("link", { name: "USA.gov"}))
        .toHaveAttribute("href", "http://www.usa.gov/")

    expect(screen.getByRole("link", { name: "GobiernoUSA"}))
        .toHaveAttribute("href", "https://www.usa.gov/espanol/")

    expect(screen.getByRole("link", { name: "Bureau of Consular Affairs Facebook"}))
        .toHaveAttribute("href", "https://www.facebook.com/usdos/")

    expect(screen.getByRole("link", { name: "Bureau of Consular Affairs Twitter"}))
        .toHaveAttribute("href", "https://twitter.com/travelgov/")

    expect(screen.getByRole("link", { name: "Bureau of Consular Affairs Instagram"}))
        .toHaveAttribute("href", "https://www.instagram.com/travelgov/")

    expect(screen.getByRole("link", { name: "Department of State Videos"}))
        .toHaveAttribute("href", "http://www.youtube.com/user/statevideo")

    expect(screen.getByRole("link", { name: "Travel Advisory RSS Feed"}))
        .toHaveAttribute("href", "https://blogs.state.gov/")
})
