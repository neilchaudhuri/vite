import React, { useMemo, useRef, useCallback, useState, useEffect } from "react"
import { Box, BoxProps, VisuallyHidden, PseudoBox, PseudoBoxProps, List, ListItem, useTheme, Input, Text } from "@chakra-ui/core"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { ArrowDropDownSharp, ClearSharp, AddSharp } from "@material-ui/icons"
import { useCombobox, UseSelectPropGetters } from "downshift"
import { motion } from "framer-motion"
import { useVirtual } from "react-virtual"
import { ErrorMessage } from "./ErrorMessage"
import { ValidationState } from "./ValidationState"
import { setMutableRef } from "./MutableRef"
import { Option } from "./Option"
import {
	AddNewProps,
	AutocompleteChangeHandler,
	generateOptions,
	menuKeyDownHandlerHelper,
	useAutocompleteAnimation,
} from "./Autocomplete"

export type AutocompleteSelectSize = "xs" | "sm" | "md" | "lg" | "xl" | "full"

const sizes: Record<AutocompleteSelectSize, string> = {
	xs: "selectXs",
	sm: "selectSm",
	md: "selectMd",
	lg: "selectLg",
	xl: "selectXl",
	full: "full",
}

type OmittedBoxProps = "transition" | "style"

const BoxMotion = motion.custom<Omit<BoxProps, OmittedBoxProps>>(Box)
const PseudoBoxMotion = motion.custom<Omit<PseudoBoxProps, OmittedBoxProps>>(PseudoBox)

interface C1AutocompleteSelectProps {
	validationState?: ValidationState
	id: string
	size?: AutocompleteSelectSize
	value?: string
	options: Option[]
	addNew?: AddNewProps
	errorMessage?: string
	onChange?: AutocompleteChangeHandler
	filter?: (input: string) => Option[]
	clearable?: boolean
}

type OmittedTypes = "size" | "defaultChecked" | "onChange" | "value" | "defaultValue" | "multiple"

export type AutocompleteSelectProps<T = HTMLSelectElement> = C1AutocompleteSelectProps &
	Omit<React.SelectHTMLAttributes<T>, OmittedTypes> &
	React.RefAttributes<T>

export const AutocompleteSelect = React.forwardRef<HTMLButtonElement, AutocompleteSelectProps>(function AutocompleteSelect(
	p,
	ref
) {
	const {
		validationState,
		id,
		"aria-labelledby": ariaLabelledby,
		"size": selectSize = "md",
		value,
		options,
		addNew,
		filter,
		errorMessage,
		onChange,
		disabled,
		required,
		"placeholder": autocompletePlaceholder = "Type to filter",
		name,
		form,
		clearable = false,
		...selectProps
	} = p
	const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
	const addNewOption = useMemo(() => {
		return { label: addNew?.text ?? "Add new", value: "" }
	}, [addNew?.text])

	const initialSelectedItem = useMemo(() => {
		return filteredOptions.find(opt => opt.value === value)
	}, [filteredOptions, value])
	const success = validationState === "success"
	const error = validationState === "error"
	const theme = useTheme()

	let borderColor = "inputBorder"
	if (success) {
		borderColor = "success"
	} else if (error) {
		borderColor = "error"
	}

	/*
	 * Set up row virtualizer for improved performance
	 * with large lists of options.
	 *
	 * The estimated row size of 40px should match
	 * the `option` theme size
	 */
	const listRef = useRef<HTMLUListElement>(null)
	const rowVirtualizer = useVirtual({
		size: filteredOptions.length,
		parentRef: listRef,
		estimateSize: useCallback(() => 40, []),
		overscan: 2,
	})

	const {
		isOpen,
		selectedItem,
		highlightedIndex,
		setHighlightedIndex,
		getToggleButtonProps,
		getMenuProps,
		getItemProps,
		getComboboxProps,
		getInputProps,
		inputValue,
		reset,
		selectItem,
		setInputValue,
	} = useCombobox<Option>({
		items: filteredOptions,
		itemToString: item => (item ? item.label : ""),
		id: id,
		labelId: ariaLabelledby,
		initialSelectedItem: initialSelectedItem,
		onSelectedItemChange: changes => onChange && onChange(changes.selectedItem?.value),
		onIsOpenChange: change => {
			if (change.isOpen) {
				// If no item is selected, return scroll position to top
				!selectedItem && rowVirtualizer.scrollToIndex(0)
			}
		},
		onHighlightedIndexChange: ({ highlightedIndex }) => {
			/*
			 * If highlighted index (i.e. index of focused list item) is available,
			 * scroll virtual window to highlighted item
			 */
			highlightedIndex && highlightedIndex >= 0 && rowVirtualizer.scrollToIndex(highlightedIndex)
		},
		onInputValueChange: ({ inputValue }) => {
			if (inputValue && inputValue !== "") {
				const newFilteredOptions = (filter && filter(inputValue)) || [
					...options.filter(o => o.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0).slice(0, 5),
				]
				setFilteredOptions(addNew ? [addNewOption, ...newFilteredOptions] : newFilteredOptions)
			} else reset()
		},
		stateReducer: (_state, actionAndChanges) => {
			const { type, changes } = actionAndChanges
			if (type === useCombobox.stateChangeTypes.InputBlur) {
				/* Reset autocomplete on blur in the following cases:
					1) No selected item
					2) Selected item but the value in the input doesn't match--e.g. if the user selected something
					and went back and edited the input and doesn't select something new
				 */
				if ((changes.selectedItem && changes.inputValue !== changes.selectedItem.label) || !changes.selectedItem) {
					return { ...changes, isOpen: false, inputValue: "", items: options }
				}
			} else if (type === useCombobox.stateChangeTypes.InputChange) {
				options.forEach(o => {
					if (o.label.toLowerCase() === changes.inputValue?.toLowerCase()) {
						selectItem(o)
					}
				})
				return changes
			} else if (addNew && type === useCombobox.stateChangeTypes.InputKeyDownEnter && highlightedIndex === 0) {
				changes.inputValue === addNew.text && addNew.onClick()
			}
			return changes
		},
	})
	useEffect(() => {
		if (initialSelectedItem && initialSelectedItem.label !== addNewOption.label) {
			setInputValue(initialSelectedItem.label)
		} else {
			reset()
		}
		setFilteredOptions(addNew ? [addNewOption, ...options] : options)
	}, [initialSelectedItem, options, addNew, addNewOption, reset, setInputValue])
	const menuKeyDownHandler = menuKeyDownHandlerHelper(filteredOptions, highlightedIndex, setHighlightedIndex)
	const iconOutline = {
		// @ts-ignore
		outline: `1px dashed ${theme.colors.accent as string}`,
	}

	return (
		<>
			<Box position="relative" width={sizes[selectSize]} mt={8} {...getComboboxProps()}>
				<VisuallyHidden
					as="input"
					// @ts-ignore
					type="text"
					name={name}
					defaultValue={selectedItem?.value}
					disabled={disabled}
					required={required}
					tabIndex={-1}
					top="100%"
					form={form}
					aria-hidden={true}
				/>
				<PseudoBox
					{...selectProps}
					as="button"
					// @ts-ignore
					type="button"
					display="flex"
					alignItems="center"
					fontFamily="default"
					fontSize="base"
					height="input"
					width="full"
					bg="white"
					paddingLeft="12"
					paddingRight={0}
					paddingY="4"
					border={success || error ? 2 : "px"}
					borderColor={borderColor}
					color="text"
					_focus={{
						borderWidth: "2",
						borderColor: "accent",
						outline: "none",
					}}
					_disabled={{
						color: "disabledButtonText",
						bg: "disabledBackground",
						border: "px",
						borderColor: "disabledBorder",
					}}
					{...getToggleButtonProps({
						disabled: disabled,
						ref: elem => {
							setMutableRef(elem, ref)
						},
					})}>
					<Input
						id={`${id}-input`}
						display="flex"
						flex="1"
						p={0}
						h="100%"
						fontFamily="default"
						fontSize="base"
						margin={0}
						overflow="hidden"
						color={(inputValue && inputValue !== "") || selectedItem ? "inherit" : "inputPlaceholder"}
						bg={disabled ? "disabled" : "white"}
						isDisabled={disabled}
						isTruncated
						value={inputValue}
						placeholder={disabled ? "" : autocompletePlaceholder}
						{...getInputProps()}
					/>

					{clearable && selectedItem && (
						<PseudoBox
							as="button"
							// @ts-ignore
							type="button"
							display="inline-flex"
							alignItems="center"
							bg="transparent"
							border="none"
							cursor="pointer"
							aria-label="Clear selection"
							onClick={reset}
							p={0}
							marginLeft="8"
							_focus={iconOutline}
							_hover={iconOutline}
							_active={iconOutline}>
							<Box as={ClearSharp} size="iconMd" color="doveGray" />
						</PseudoBox>
					)}
					<Box as={ArrowDropDownSharp} role="presentation" size="iconLg" />
				</PseudoBox>
				<AutocompleteSelectMenuPropsMenu
					{...getMenuProps({
						ref: listRef,
						onKeyDown: menuKeyDownHandler,
					})}
					isOpen={isOpen}
					numOptions={filteredOptions.length}>
					<Box as="li" key="total-size" height={rowVirtualizer.totalSize} aria-hidden={true} />
					{rowVirtualizer.virtualItems.reduce<React.ReactNode[]>((listItems, virtualRow) => {
						const opt = filteredOptions[virtualRow.index]
						const optIdx = filteredOptions.indexOf(opt)
						if (addNew && optIdx === 0) {
							listItems.push(
								<ListItem
									key={optIdx}
									position="absolute"
									top={0}
									left={0}
									width="100%"
									transform={`translateY(${virtualRow.start}px)`}
									display="flex"
									alignItems="center"
									boxSizing="border-box"
									height={virtualRow.size}
									paddingX="12"
									paddingY="4"
									cursor="pointer"
									backgroundColor={highlightedIndex === optIdx ? "clickable" : ""}
									color={highlightedIndex === optIdx ? "white" : "text"}
									flexWrap="wrap"
									data-testid="add-new"
									{...getItemProps({
										item: opt,
										index: 0,
										onClick: e => {
											// @ts-ignore
											e.nativeEvent.preventDownshiftDefault = true
											addNew.onClick()
										},
									})}>
									<Box
										as={AddSharp}
										mr={8}
										size="iconMd"
										color={highlightedIndex === optIdx ? "white" : "badgeIcon"}
									/>
									<Text as="span" fontWeight="normal">
										{addNew.text}
									</Text>
								</ListItem>
							)
						} else {
							listItems.push(
								<AutocompleteSelectOption
									key={optIdx}
									index={optIdx}
									highlightedIndex={highlightedIndex}
									getItemProps={getItemProps}
									item={opt}
									inputValue={inputValue}
									height={virtualRow.size}
									isAbsolute
									translateVal={virtualRow.start}
								/>
							)
						}

						return listItems
					}, [])}
				</AutocompleteSelectMenuPropsMenu>
			</Box>
			{!disabled && error && errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	)
})

interface AutocompleteSelectMenuProps {
	// groupIndex?: number
	id?: string
	/**
	 * `true` if menu is open
	 */
	isOpen: boolean
	/**
	 * Total number of options in menu.
	 * Used to determine menu animation speed
	 */
	numOptions: number
	translateVal?: number
	children: React.ReactElement[]
}

const AutocompleteSelectMenuPropsMenu = React.forwardRef<React.FC<AutocompleteSelectMenuProps>, AutocompleteSelectMenuProps>(
	function AutocompleteSelectMenuPropsMenu(p, ref) {
		const { children, isOpen, numOptions, translateVal = 0, ...downshiftProps } = p
		const { menuContainerMotion, menuMotion } = useAutocompleteAnimation(numOptions)

		return (
			<BoxMotion
				position="absolute"
				width="full"
				paddingBottom="12"
				overflowY="hidden"
				variants={menuContainerMotion}
				initial={false}
				animate={isOpen ? "visible" : "hidden"}>
				{
					<PseudoBoxMotion
						as={List}
						role="listbox"
						tabIndex={-1}
						{...downshiftProps}
						p={0}
						m={0}
						_focus={{
							outline: "none",
						}}
						backgroundColor="white"
						fontFamily="default"
						fontSize="base"
						border="px"
						borderColor="inputBorder"
						maxH="302px"
						overflowY="auto"
						boxShadow={isOpen ? "0px 4px 6px rgba(0,0,0,0.4)" : ""}
						boxSizing="border-box"
						variants={menuMotion}
						// @ts-ignore
						ref={ref}>
						{children}
					</PseudoBoxMotion>
				}
			</BoxMotion>
		)
	}
)

interface AutocompleteSelectOptionProps {
	index: number
	highlightedIndex: number
	getItemProps: UseSelectPropGetters<Option>["getItemProps"]
	item: Option
	inputValue: string
	isAbsolute?: boolean
	height: number | string
	translateVal?: number
}

const AutocompleteSelectOption: React.FC<AutocompleteSelectOptionProps> = (p: AutocompleteSelectOptionProps) => {
	const { index, highlightedIndex, getItemProps, item, isAbsolute, height, translateVal = 0, inputValue } = p
	const isHighlighted = highlightedIndex === index
	const tokenComponents = useMemo(() => {
		if (inputValue === "") {
			return []
		} else {
			return generateOptions(item.label, inputValue)
		}
	}, [inputValue, item.label])
	return (
		<ListItem
			position={isAbsolute ? "absolute" : "static"}
			top={0}
			left={0}
			width="100%"
			transform={isAbsolute ? `translateY(${translateVal}px)` : undefined}
			display="flex"
			alignItems="center"
			boxSizing="border-box"
			height={height}
			paddingX="12"
			paddingY="4"
			cursor="pointer"
			backgroundColor={isHighlighted ? "clickable" : ""}
			color={isHighlighted ? "white" : "text"}
			flexWrap="wrap"
			{...getItemProps({
				item: item,
				index: index,
			})}>
			{tokenComponents.length > 0 && tokenComponents}
			{tokenComponents.length === 0 && <Text as="span">{item.label}</Text>}
		</ListItem>
	)
}
