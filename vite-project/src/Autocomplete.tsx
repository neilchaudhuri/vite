import { Text, useTheme } from "@chakra-ui/core"
import React from "react"
import { Option } from "./Option"

export const generateOptions: (label: string, inputValue: string) => (undefined | Element)[] = (
	label: string,
	inputValue: string
) => {
	const escaped = inputValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
	const regex = new RegExp(`(${escaped})`, "gi")
	const tokens = label.replace(regex, "|$1|").split("|")
	const lowercaseInput = inputValue.toLowerCase()
	return tokens.map((t, i) => {
		if (t === "") {
			return undefined
		} else if (t.toLowerCase() === lowercaseInput) {
			return (
				<Text as="span" fontWeight="autocompleteMatch" key={`${t}-${i}`}>
					{t}
				</Text>
			)
		} else {
			return (
				<Text as="span" fontWeight="normal" key={t}>
					{t}
				</Text>
			)
		}
	})
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAutocompleteAnimation = (numOptions: number) => {
	const { zIndices } = useTheme()
	const zIndexDisplay = zIndices.dropdown
	const openedPosition = "translateY(0%)"
	const closedPosition = "translateY(-100%)"
	const menuContainerMotion = {
		hidden: {
			opacity: 0,
			zIndex: zIndices.hide,
			transition: {
				when: "afterChildren",
			},
		},
		visible: {
			opacity: 1,
			zIndex: zIndexDisplay,
			transition: {
				when: "beforeChildren",
			},
		},
	}
	const menuMotion = {
		hidden: {
			transform: closedPosition,
			transition: {
				type: "tween",
				duration: 0.25,
				ease: "easeInOut",
			},
		},
		visible: {
			transform: openedPosition,
			transition: {
				type: "tween",
				duration: numOptions > 3 ? 0.5 : 0.25,
				ease: "easeInOut",
			},
		},
	}

	return { menuContainerMotion, menuMotion }
}

export type AutocompleteChangeHandler = (selectedValue?: string) => void

export interface DownshiftEvent {
	nativeEvent: {
		preventDownshiftDefault: boolean
	}
}

type DownshiftKeyboardEvent<T = HTMLElement> = React.KeyboardEvent<T> & DownshiftEvent

export const menuKeyDownHandlerHelper: (
	filteredOptions: Option[],
	highlightedIndex: number,
	setHighlightedIndex: (i: number) => void
) => (event: DownshiftKeyboardEvent) => void = (
	filteredOptions: Option[],
	highlightedIndex: number,
	setHighlightedIndex: (i: number) => void
) => (event: DownshiftKeyboardEvent) => {
	const highlightedOption = filteredOptions[highlightedIndex]

	if (filteredOptions.includes(highlightedOption)) {
		if (event.key === "ArrowUp") {
			let newItemIdx = filteredOptions.indexOf(highlightedOption) - 1
			newItemIdx = newItemIdx > 0 ? newItemIdx : 0
			const newItem = filteredOptions[newItemIdx]

			setHighlightedIndex(filteredOptions.indexOf(newItem))
			event.nativeEvent.preventDownshiftDefault = true
		} else if (event.key === "ArrowDown") {
			let newItemIdx = filteredOptions.indexOf(highlightedOption) + 1
			newItemIdx = newItemIdx < filteredOptions.length ? newItemIdx : filteredOptions.length - 1
			const newItem = filteredOptions[newItemIdx]

			setHighlightedIndex(filteredOptions.indexOf(newItem))
			event.nativeEvent.preventDownshiftDefault = true
		}
	} else if (highlightedIndex >= 0) {
		if (event.key === "ArrowUp") {
			const newOptIdx = highlightedIndex - 1
			const newOption = filteredOptions[newOptIdx]

			if (!filteredOptions.includes(newOption)) {
				setHighlightedIndex(newOptIdx)
			}
			event.nativeEvent.preventDownshiftDefault = true
		} else if (event.key === "ArrowDown") {
			let newOptIdx = highlightedIndex + 1
			newOptIdx = newOptIdx < filteredOptions.length ? newOptIdx : filteredOptions.length - 1
			const newOption = filteredOptions[newOptIdx]

			if (!filteredOptions.includes(newOption)) {
				setHighlightedIndex(newOptIdx)
			}
			event.nativeEvent.preventDownshiftDefault = true
		} else if (event.key === "Escape") {
			let newOptIdx = highlightedIndex - 1
			let newOption = filteredOptions[newOptIdx]

			while (!filteredOptions.includes(newOption)) {
				--newOptIdx
				newOption = filteredOptions[newOptIdx]
			}

			setHighlightedIndex(newOptIdx)

			event.nativeEvent.preventDownshiftDefault = true
		}
	}
}

export interface AddNewProps {
	text?: string
	onClick: () => void
}