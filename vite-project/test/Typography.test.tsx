import React from "react"
import { screen } from "@testing-library/react"
import { H1, H2, H3, H4, P, FinePrint, ExtraFinePrint, Label, BigText } from "../src/Typography"
import { renderWithTheme } from "./wrapperUtils"
import "@testing-library/jest-dom"

describe("Basic H1 display works", () => {
    test("H1 standard display works", () => {
        renderWithTheme(<H1 gridColumn="1 / -1">Heading 1</H1>)
        
        const h1 = screen.getByRole("heading", { name: "Heading 1", level: 1 })
        expect(h1).toBeInTheDocument()
        expect(h1).toHaveStyle({
            fontFamily: "'EB Garamond',serif",
            fontSize: "32px",
            color: "rgb(10, 34, 64)"
        })
    })

    test("H1 custom color works", () => {
        renderWithTheme(<H1 color="error">Heading 1</H1>)
        
        const h1 = screen.getByRole("heading", { name: "Heading 1", level: 1 })
        expect(h1).toBeInTheDocument()
        expect(h1).toHaveStyle({
            fontFamily: "'EB Garamond',serif",
            fontSize: "32px",
            color: "rgb(193, 2, 48)"
        })
    })
})

describe("Basic H2 display works", () => {
    test("H2 standard display works", () => {
        renderWithTheme(<H2 gridColumn="1 / -1">Heading 2</H2>)
        
        const h2 = screen.getByRole("heading", { name: "Heading 2", level: 2 })
        expect(h2).toBeInTheDocument()
        expect(h2).toHaveStyle({
            fontFamily: "'EB Garamond',serif",
            fontSize: "24px",
            color: "rgb(10, 34, 64)"
        })
    })

    test("H2 custom color works", () => {
        renderWithTheme(<H2 color="error">Heading 2</H2>)
        
        const h2 = screen.getByRole("heading", { name: "Heading 2", level: 2 })
        expect(h2).toBeInTheDocument()
        expect(h2).toHaveStyle({
            fontFamily: "'EB Garamond',serif",
            fontSize: "24px",
            color: "rgb(193, 2, 48)"
        })
    })
})

describe("Basic H3 display works", () => {
    test("H3 standard display works", () => {
        renderWithTheme(<H3 gridColumn="1 / -1">Heading 3</H3>)
        
        const h3 = screen.getByRole("heading", { name: "Heading 3", level: 3 })
        expect(h3).toBeInTheDocument()
        expect(h3).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "16px",
            color: "rgb(33, 33, 33)"
        })
    })

    test("H3 custom color works", () => {
        renderWithTheme(<H3 color="error">Heading 3</H3>)
        
        const h3 = screen.getByRole("heading", { name: "Heading 3", level: 3 })
        expect(h3).toBeInTheDocument()
        expect(h3).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "16px",
            color: "rgb(193, 2, 48)"
        })
    })
})

describe("Basic H4 display works", () => {
    test("H4 standard display works", () => {
        renderWithTheme(<H4 gridColumn="1 / -1">Heading 4</H4>)
        
        const h4 = screen.getByRole("heading", { name: "Heading 4", level: 4 })
        expect(h4).toBeInTheDocument()
        expect(h4).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "16px",
            color: "rgb(33, 33, 33)"
        })
    })
    
    test("H4 custom color works", () => {
        renderWithTheme(<H4 color="error">Heading 4</H4>)
        
        const h4 = screen.getByRole("heading", { name: "Heading 4", level: 4 })
        expect(h4).toBeInTheDocument()
        expect(h4).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "16px",
            color: "rgb(193, 2, 48)"
        })
    })
})

describe("Basic P display works", () => {
    test("P standard display works", () => {
        renderWithTheme(<P gridColumn="1 / -1">Paragraph</P>)
        
        const paragraph = screen.getByText("Paragraph")
        expect(paragraph).toBeInTheDocument()
        expect(paragraph).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "1rem",
            color: "rgb(33, 33, 33)"
        })
    })
    
    test("P custom color works", () => {
        renderWithTheme(<P color="error">Paragraph</P>)
        
        const paragraph = screen.getByText("Paragraph")
        expect(paragraph).toBeInTheDocument()
        expect(paragraph).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "1rem",
            color: "rgb(193, 2, 48)"
        })
    })
})

describe("Basic BigText display works", () => {
    test("BigText standard display works", () => {
        renderWithTheme(<BigText gridColumn="1 / -1">Big Text</BigText>)
        
        const bigText = screen.getByText("Big Text")
        expect(bigText).toBeInTheDocument()
        expect(bigText).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "1rem",
            color: "rgb(33, 33, 33)"
        })
    })
    
    test("BigText custom color works", () => {
        renderWithTheme(<BigText color="error">Big Text</BigText>)
        
        const bigText = screen.getByText("Big Text")
        expect(bigText).toBeInTheDocument()
        expect(bigText).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "1rem",
            color: "rgb(193, 2, 48)"
        })
    })
})

describe("Basic Label display works", () => {
    test("Label standard display works", () => {
        renderWithTheme(<Label gridColumn="1 / -1">Label</Label>)
        
        const label = screen.getByText("Label")
        expect(label).toBeInTheDocument()
        expect(label).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "14px",
            color: "rgb(102, 102, 102)"
        })
    })
    
    test("Label custom color is not allowed", () => {
        renderWithTheme(<Label color="error">Label</Label>)
        
        const label = screen.getByText("Label")
        expect(label).toBeInTheDocument()
        expect(label).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "14px",
            color: "rgb(102, 102, 102)"
        })
    })
})

describe("Basic FinePrint display works", () => {
    test("FinePrint standard display works", () => {
        renderWithTheme(<FinePrint gridColumn="1 / -1">Fine Print</FinePrint>)
        
        const finePrint = screen.getByText("Fine Print")
        expect(finePrint).toBeInTheDocument()
        expect(finePrint).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "14px",
            color: "rgb(33, 33, 33)"
        })
    })
    
    test("FinePrint custom color works", () => {
        renderWithTheme(<FinePrint color="error">Fine Print</FinePrint>)
        
        const finePrint = screen.getByText("Fine Print")
        expect(finePrint).toBeInTheDocument()
        expect(finePrint).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "14px",
            color: "rgb(193, 2, 48)"
        })
    })
})

describe("Basic ExtraFinePrint display works", () => {
    test("ExtraFinePrint standard display works", () => {
        renderWithTheme(<ExtraFinePrint gridColumn="1 / -1">Extra Fine Print</ExtraFinePrint>)
        
        const extraFinePrint = screen.getByText("Extra Fine Print")
        expect(extraFinePrint).toBeInTheDocument()
        expect(extraFinePrint).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "12px",
            color: "rgb(33, 33, 33)"
        })
    })
    
    test("ExtraFinePrint custom color works", () => {
        renderWithTheme(<ExtraFinePrint color="error">Extra Fine Print</ExtraFinePrint>)
        
        const extraFinePrint = screen.getByText("Extra Fine Print")
        expect(extraFinePrint).toBeInTheDocument()
        expect(extraFinePrint).toHaveStyle({
            fontFamily: "'Open Sans',sans-serif",
            fontSize: "12px",
            color: "rgb(193, 2, 48)"
        })
    })
})
