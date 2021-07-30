import React, { useReducer, useMemo, useRef, useCallback } from "react"
import { Box, BoxProps, VisuallyHidden, PseudoBox, PseudoBoxProps, Text, List, ListItem, useTheme } from "@chakra-ui/core"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { ArrowDropDownSharp, ClearSharp, ArrowRightSharp } from "@material-ui/icons"
import { useSelect, UseSelectPropGetters } from "downshift"
import { AnimatePresence, motion } from "framer-motion"
import { useVirtual } from "react-virtual"
import { ErrorMessage } from "./ErrorMessage"
import { InputIcon, IconAlignment } from "./Icon"
import { ValidationState } from "./ValidationState"
import { setMutableRef } from "./MutableRef"
import { Option } from "./Option"

export type SelectSize = "xs" | "sm" | "md" | "lg" | "xl" | "full"

const sizes: Record<SelectSize, string> = {
	xs: "selectXs",
	sm: "selectSm",
	md: "selectMd",
	lg: "selectLg",
	xl: "selectXl",
	full: "full",
}

export const ClearIcon: InputIcon = {
	mdIcon: ClearSharp,
	color: "doveGray",
	alignment: IconAlignment.RIGHT,
	ariaLabel: "Clear selection",
}

export type SelectChangeHandler = (selectedValue?: string) => void

interface DownshiftEvent {
	nativeEvent: {
		preventDownshiftDefault: boolean
	}
}

type DownshiftMouseEvent<T = HTMLElement> = React.MouseEvent<T> & DownshiftEvent

type DownshiftKeyboardEvent<T = HTMLElement> = React.KeyboardEvent<T> & DownshiftEvent

/**
 * Select option with a nested menu
 */
interface OptionGroup {
	label: string
	options: Option[]
}

enum OptionGroupActionTypes {
	OPEN = "open",
	CLOSE = "close",
	TOGGLE = "toggle",
}

/**
 * Action format for Option Group dispatcher
 * which manages open/closed state
 * of nested menus
 */
interface OptionGroupAction {
	type: OptionGroupActionTypes
	groupId?: number
}

type OmittedBoxProps = "transition" | "style"

const BoxMotion = motion.custom<Omit<BoxProps, OmittedBoxProps>>(Box)
const PseudoBoxMotion = motion.custom<Omit<PseudoBoxProps, OmittedBoxProps>>(PseudoBox)
const ListItemMotion = motion.custom<Omit<PseudoBoxProps, OmittedBoxProps>>(ListItem)

interface C1SelectProps {
	validationState?: ValidationState
	id: string
	size?: SelectSize
	value?: string
	options: (Option | OptionGroup)[]
	errorMessage?: string
	onChange?: SelectChangeHandler
	clearable?: boolean
}

const isOptionGroup = (opt: Option | OptionGroup): opt is OptionGroup => (opt as OptionGroup).options !== undefined

const isOption = (opt: Option | OptionGroup): opt is Option => (opt as Option).value !== undefined

type OmittedTypes = "size" | "defaultChecked" | "onChange" | "value" | "defaultValue" | "multiple"

export type SelectProps<T = HTMLSelectElement> = C1SelectProps &
	Omit<React.SelectHTMLAttributes<T>, OmittedTypes> &
	React.RefAttributes<HTMLButtonElement>

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(p, ref) {
	const theme = useTheme()
	const {
		validationState,
		id,
		"aria-labelledby": ariaLabelledby,
		"size": selectSize = "md",
		value,
		options,
		errorMessage,
		onChange,
		disabled,
		required,
		"placeholder": selectPlaceholder = "Select an option",
		name,
		form,
		clearable = false,
		...selectProps
	} = p
	const success = validationState === "success"
	const error = validationState === "error"

	let borderColor = "inputBorder"
	if (success) {
		borderColor = "success"
	} else if (error) {
		borderColor = "error"
	}

	const iconOutline = {
		// @ts-ignore
		outline: `1px dashed ${theme.colors.accent as string}`,
	}

	/**
	 * List of all option groups
	 * representing entries with nested select menus
	 */
	const optGroups = useMemo(() => options.filter(isOptionGroup), [options])

	/**
	 * Flattened list of options/option groups
	 * representing all 'selectable' (i.e. options with values)
	 *
	 * This will effectively filter out all option groups
	 * while including their nested options
	 */
	const selectableOptions = useMemo(
		() =>
			options.reduce<(Option | OptionGroup)[]>((listItems, opt) => {
				if (isOptionGroup(opt)) {
					listItems = listItems.concat(opt, opt.options)
				} else {
					listItems.push(opt)
				}

				return listItems
			}, []),
		[options]
	)

	/**
	 * Reducer to manage open/closed state
	 * of nested select menus
	 */
	const [groupsState, optGroupDispatch] = useReducer(optGroupsReducer, {}, () => ({
		groups: optGroups.map(() => ({ isOpen: false })),
	}))

	/**
	 * Handles clicks on option group entries.
	 * Opens nested select menu with group sub-options
	 *
	 * @param event
	 * @param option
	 */
	const optGroupClickHandler = (event: DownshiftMouseEvent, option: OptionGroup) => {
		event.nativeEvent.preventDownshiftDefault = true
		optGroupDispatch({
			type: OptionGroupActionTypes.TOGGLE,
			groupId: optGroups.indexOf(option),
		})
	}

	/**
	 * Handles keyboard interaction on select options.
	 * Default Downshift functionality is maintained
	 * excluding the cases below:
	 * opening/closing of nested menus via enter/space/escape
	 * Navigation across select options via up/down arrow keys
	 *
	 * @param event
	 */
	const menuKeyDownHandler = (event: DownshiftKeyboardEvent) => {
		const highlightedOption = selectableOptions[highlightedIndex]
		// Option is in top-level option menu
		if (options.includes(highlightedOption)) {
			if (event.key === "Enter" || event.key === " ") {
				if (isOptionGroup(highlightedOption)) {
					optGroupDispatch({
						type: OptionGroupActionTypes.TOGGLE,
						groupId: optGroups.indexOf(highlightedOption),
					})

					setHighlightedIndex(highlightedIndex + 1)
					event.nativeEvent.preventDownshiftDefault = true
				}
			} else if (event.key === "ArrowUp") {
				let newItemIdx = options.indexOf(highlightedOption) - 1
				newItemIdx = newItemIdx > 0 ? newItemIdx : 0
				const newItem = options[newItemIdx]

				setHighlightedIndex(selectableOptions.indexOf(newItem))
				event.nativeEvent.preventDownshiftDefault = true
			} else if (event.key === "ArrowDown") {
				let newItemIdx = options.indexOf(highlightedOption) + 1
				newItemIdx = newItemIdx < options.length ? newItemIdx : options.length - 1
				const newItem = options[newItemIdx]

				setHighlightedIndex(selectableOptions.indexOf(newItem))
				event.nativeEvent.preventDownshiftDefault = true
			}
		} else if (highlightedIndex >= 0) {
			if (event.key === "ArrowUp") {
				const newOptIdx = highlightedIndex - 1
				const newOption = selectableOptions[newOptIdx]

				if (!options.includes(newOption)) {
					setHighlightedIndex(newOptIdx)
				}
				event.nativeEvent.preventDownshiftDefault = true
			} else if (event.key === "ArrowDown") {
				let newOptIdx = highlightedIndex + 1
				newOptIdx = newOptIdx < selectableOptions.length ? newOptIdx : selectableOptions.length - 1
				const newOption = selectableOptions[newOptIdx]

				if (!options.includes(newOption)) {
					setHighlightedIndex(newOptIdx)
				}
				event.nativeEvent.preventDownshiftDefault = true
			} else if (event.key === "Escape") {
				let newOptIdx = highlightedIndex - 1
				let newOption = selectableOptions[newOptIdx]

				while (!options.includes(newOption)) {
					--newOptIdx
					newOption = selectableOptions[newOptIdx]
				}

				setHighlightedIndex(newOptIdx)
				optGroupDispatch({ type: OptionGroupActionTypes.TOGGLE })
				event.nativeEvent.preventDownshiftDefault = true
			}
		}
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
		size: options.length,
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
		reset,
	} = useSelect<Option>({
		items: selectableOptions as Option[],
		itemToString: item => (item ? item.label : ""),
		id: id,
		labelId: ariaLabelledby,
		initialSelectedItem: selectableOptions.filter(isOption).find(opt => opt.value === value),
		onSelectedItemChange: changes => onChange && onChange(changes.selectedItem?.value),
		onIsOpenChange: change => {
			if (change.isOpen) {
				// If no item is selected, return scroll position to top
				selectedItem === null && rowVirtualizer.scrollToIndex(0)
			} else {
				optGroupDispatch({
					type: OptionGroupActionTypes.CLOSE,
				})
			}
		},
		selectedItem: selectableOptions.filter(isOption).find(opt => opt.value === value) ?? null,
		scrollIntoView: () => undefined,
		onHighlightedIndexChange: ({ highlightedIndex }) => {
			/*
			 * If highlighted index (i.e. index of focused list item) is available,
			 * scroll virtual window to highlighted item
			 */
			highlightedIndex !== undefined && highlightedIndex >= 0 && rowVirtualizer.scrollToIndex(highlightedIndex)
		},
	})

	return (
		<>
			<Box position="relative" width={sizes[selectSize]} mt={8}>
				<VisuallyHidden
					as="input"
					// @ts-ignore
					type="text"
					id={`${id}-input`}
					name={name}
					aria-labelledby={ariaLabelledby}
					defaultValue={selectedItem?.value}
					disabled={disabled}
					required={required}
					tabIndex={-1}
					top="100%"
					form={form}
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
					borderColor={isOpen ? "accent" : borderColor}
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
					<Text
						as={Box}
						display="flex"
						flex="1"
						margin={0}
						overflow="hidden"
						color={selectedItem ? "inherit" : "inputPlaceholder"}
						isTruncated>
						{(selectedItem && selectedItem.label) || selectPlaceholder}
					</Text>
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
							marginLeft="8"
							aria-label="Clear"
							onClick={e => {
								// Prevent default dropdown menu click behavior
								e.preventDefault()
								e.stopPropagation()
								reset()
							}}
							p={0}
							_focus={iconOutline}
							_hover={iconOutline}
							_active={iconOutline}>
							<Box as={ClearSharp} size="iconMd" color="doveGray" />
						</PseudoBox>
					)}
					<Box as={ArrowDropDownSharp} role="presentation" size="iconLg" />
				</PseudoBox>
				<SelectMenu
					{...getMenuProps({
						ref: listRef,
						onKeyDown: menuKeyDownHandler,
					})}
					isOpen={isOpen}
					numOptions={options.length}>
					<Box as="li" key="total-size" height={rowVirtualizer.totalSize} aria-hidden={true} />
					{rowVirtualizer.virtualItems.reduce<React.ReactNode[]>((listItems, virtualRow) => {
						const opt = options[virtualRow.index]
						const optIdx = selectableOptions.indexOf(opt)
						if ((opt as OptionGroup).options) {
							listItems.push(
								<SelectOption
									key={optIdx}
									index={optIdx}
									highlightedIndex={highlightedIndex}
									getItemProps={getItemProps}
									item={opt}
									height={virtualRow.size}
									isAbsolute
									translateVal={virtualRow.start}
									isGroup
									onGroupClick={optGroupClickHandler}
								/>
							)
						} else {
							listItems.push(
								<SelectOption
									key={optIdx}
									index={optIdx}
									highlightedIndex={highlightedIndex}
									getItemProps={getItemProps}
									item={opt}
									height={virtualRow.size}
									isAbsolute
									translateVal={virtualRow.start}
								/>
							)
						}

						return listItems
					}, [])}
				</SelectMenu>

				{/* Render nested/secondary select menus */}
				{optGroups.map((optGroup, groupIdx) => {
					const optIdx = options.indexOf(optGroup)
					const virtualItem = rowVirtualizer.virtualItems[optIdx]
					const startPosition = virtualItem?.start
					return (
						<SelectMenu
							key={groupIdx}
							id={`${id}-menu-nested-${groupIdx}`}
							isOpen={groupsState.groups[groupIdx].isOpen}
							numOptions={optGroup.options.length}
							aria-labelledby="nestedSelectLabel"
							isNested={true}
							translateVal={startPosition}>
							{optGroup.options.map(opt => {
								const selectableOptIdx = selectableOptions.indexOf(opt)
								return (
									<SelectOption
										key={selectableOptIdx}
										index={selectableOptIdx}
										highlightedIndex={highlightedIndex}
										getItemProps={getItemProps}
										item={opt}
										height="option"
									/>
								)
							})}
						</SelectMenu>
					)
				})}
			</Box>
			{!disabled && error && errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	)
})

interface OptionGroupState {
	groups: {
		isOpen: boolean
	}[]
}

const optGroupsReducer = (state: OptionGroupState, action: OptionGroupAction) => {
	switch (action.type) {
		case OptionGroupActionTypes.CLOSE: {
			let newGroups
			const idx = action.groupId
			if (idx) {
				const group = { ...state.groups[idx] }
				group.isOpen = false
				newGroups = [...state.groups.slice(0, idx), group, ...state.groups.slice(idx + 1)]
			} else {
				newGroups = state.groups.map(group => {
					group.isOpen = false
					return group
				})
			}
			return { groups: newGroups }
		}
		case OptionGroupActionTypes.OPEN:
			return {
				groups: state.groups.map((group, index) => {
					group.isOpen = index === action.groupId
					return group
				}),
			}
		case OptionGroupActionTypes.TOGGLE:
			return {
				groups: state.groups.map((group, index) => {
					group.isOpen = index === action.groupId && !group.isOpen
					return group
				}),
			}
		default:
			return state
	}
}

interface C1SelectMenuProps {
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
	/**
	 * `true` if menu is nested (i.e. the child of an option group)
	 */
	isNested?: boolean
	/**
	 * Pixel value for translateY to properly position nested menu
	 * relative to its parent option group
	 */
	translateVal?: number
	children: React.ReactElement[]
}

const SelectMenu = React.forwardRef<React.FC<C1SelectMenuProps>, C1SelectMenuProps>(function SelectMenu(p, ref) {
	const { children, isOpen, numOptions, isNested, translateVal = 0, ...downshiftProps } = p
	const { zIndices } = useTheme()

	const zIndexDisplay = p.isNested ? zIndices.dropdown : zIndices.dropdown - 1

	const openedPosition = isNested ? "translateX(0%)" : "translateY(0%)"
	const closedPosition = isNested ? "translateX(-100%)" : "translateY(-100%)"

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
				duration: isNested ? 0 : numOptions > 3 ? 0.5 : 0.25,
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

	return (
		<BoxMotion
			position="absolute"
			width="full"
			paddingBottom="12"
			overflowY="hidden"
			left={isNested ? "calc(100% - 1px)" : ""}
			transform={isNested ? `translateY(${translateVal}px)` : undefined}
			variants={menuContainerMotion}
			initial={false}
			animate={isOpen ? "visible" : "hidden"}>
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
				borderTop={!isNested ? 0 : undefined}
				borderColor="inputBorder"
				maxH="302px"
				overflowY="auto"
				boxShadow={isOpen ? "0px 4px 6px rgba(0,0,0,0.4)" : ""}
				boxSizing="border-box"
				variants={menuMotion}
				// @ts-ignore
				ref={ref}>
				<AnimatePresence>{isOpen && children}</AnimatePresence>
			</PseudoBoxMotion>
		</BoxMotion>
	)
})

interface C1SelectOptionProps {
	index: number
	highlightedIndex: number
	getItemProps: UseSelectPropGetters<Option>["getItemProps"]
	item: Option | OptionGroup
	isAbsolute?: boolean
	height: number | string
	translateVal?: number
	isGroup?: boolean
	onGroupClick?: (event: DownshiftMouseEvent, option: OptionGroup) => void
}

const SelectOption: React.FC<C1SelectOptionProps> = (p: C1SelectOptionProps) => {
	const { index, highlightedIndex, getItemProps, item, isAbsolute, height, translateVal = 0, isGroup, onGroupClick } = p

	const isHighlighted = highlightedIndex === index

	return (
		<ListItemMotion
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
			paddingRight={isGroup ? "0" : ""}
			cursor="pointer"
			backgroundColor={isHighlighted ? "clickable" : ""}
			color={isHighlighted ? "white" : "text"}
			{...getItemProps({
				item: item as Option,
				index: index,
				onClick: isGroup ? (e: DownshiftMouseEvent) => onGroupClick && onGroupClick(e, item as OptionGroup) : undefined,
			})}>
			{isGroup ? (
				<>
					<Text as="span" flex="1">
						{item.label}
					</Text>
					<Box as={ArrowRightSharp} role="presentation" size="iconLg" />
				</>
			) : (
				<Text as="span">{item.label}</Text>
			)}
		</ListItemMotion>
	)
}
