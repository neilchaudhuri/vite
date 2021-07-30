import React, { Dispatch, SetStateAction, useContext, useEffect, useState, useRef } from "react"
import { IconAlignment } from "./Icon"
import { Text } from "./Text"
import { FormInput } from "./FormInput"
import { ScheduleSharp } from "@material-ui/icons"
import { Box, BoxProps, Flex, PseudoBox, Stack, useDisclosure, useTheme } from "@chakra-ui/core"
import { AnimatePresence, motion } from "framer-motion"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { Select, SelectChangeHandler } from "./Select"
import { ValidationState } from "ValidationState"
import { parse } from "date-fns"

interface TimePickerProps {
	labelText: string
	id: string
	value?: Date
	validationState?: ValidationState
	gridColumn?: string
	errorMessage?: string
	disabled?: boolean
	onChange: (d: Date) => void
}

type StringSetter = Dispatch<SetStateAction<string | undefined>>

type TimePickerContextType = {
	id: string
	clock: string | undefined
	setClock: StringSetter
	timeZone: string | undefined
	setTimeZone: StringSetter
}

const TimePickerContext = React.createContext<TimePickerContextType>({
	id: "",
	clock: undefined,
	setClock: () => {
		console.log()
	},
	timeZone: undefined,
	setTimeZone: () => {
		console.log()
	},
})

const createDate = (d: Date | undefined) => {
	if (d) return d
	else return new Date()
}

export const TimePicker: React.FC<TimePickerProps> = p => {
	const { value, labelText, id, gridColumn = "1 / -1", validationState, errorMessage, disabled, onChange } = p
	const [date, setDate] = useState<Date | undefined>(value)
	let clockTime, timeZoneTime
	if (date) {
		clockTime = date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})
		timeZoneTime = date
			.toTimeString()
			.split(" ")[1]
			.substring(3)
	}
	const [clock, setClock] = useState<string | undefined>(clockTime)
	const [timeZone, setTimeZone] = useState<string | undefined>(timeZoneTime)
	useEffect(() => {
		if (clock && timeZone) {
			setDate(d => parse(`${clock} ${timeZone}`, "h:mm a xx", createDate(d)))
		}
	}, [clock, timeZone])
	useEffect(() => {
		if (date) onChange(date)
	}, [date, onChange])

	return (
		<TimePickerContext.Provider
			value={{
				id: id,
				clock: clock,
				setClock: setClock,
				timeZone: timeZone,
				setTimeZone: setTimeZone,
			}}>
			<Box gridColumn={gridColumn}>
				<Flex justifyContent="flex-start">
					<Time
						labelText={labelText}
						validationState={validationState}
						errorMessage={errorMessage}
						disabled={disabled}
					/>
					<TimeZone validationState={validationState} disabled={disabled} />
				</Flex>
			</Box>
		</TimePickerContext.Provider>
	)
}

interface TimeProps {
	labelText: string
	validationState?: ValidationState
	errorMessage?: string
	disabled?: boolean
}

const Time: React.FC<TimeProps> = p => {
	const { id, clock, setClock } = useContext(TimePickerContext)
	const { labelText, validationState, errorMessage, disabled } = p
	const { zIndices } = useTheme()

	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { isOpen, onOpen, onClose } = useDisclosure()

	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const closeDropdown = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				onClose()
			}
		}
		document.addEventListener("click", closeDropdown)

		return () => {
			document.removeEventListener("click", closeDropdown)
		}
	})
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
			zIndex: zIndices.dropdown,
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
				duration: 0.5,
				ease: "easeInOut",
			},
		},
		visible: {
			transform: openedPosition,
			transition: {
				type: "tween",
				duration: 0.5,
				ease: "easeInOut",
			},
		},
	}

	return (
		<>
			<Box w="140px" ref={dropdownRef}>
				<Stack spacing={0}>
					<FormInput labelText={labelText} labelId={`timePickerTimeLabel_${id}`}>
						<Text
							id={`timePickerTime_${id}`}
							value={clock}
							size="full"
							placeholder="HH:MM"
							textIcon={{ mdIcon: ScheduleSharp, color: "accent", alignment: IconAlignment.LEFT }}
							onChange={e => setClock(e.target.value)}
							onClick={isOpen ? onClose : onOpen}
							validationState={validationState}
							errorMessage={errorMessage}
							disabled={disabled}
						/>
					</FormInput>
					<BoxMotion
						overflowY="hidden"
						paddingBottom="12"
						variants={menuContainerMotion}
						initial={false}
						animate={isOpen ? "visible" : "hidden"}>
						{
							<BoxMotion
								m={0}
								bg="pageBackground"
								color="text"
								fontFamily="default"
								fontSize="base"
								h="202px"
								overflowY="auto"
								border="px"
								borderColor="inputBorder"
								boxShadow={isOpen ? "0px 4px 6px rgba(0,0,0,0.4)" : ""}
								boxSizing="border-box"
								variants={menuMotion}>
								<AnimatePresence>
									{isOpen &&
										times.map(t => {
											return (
												<PseudoBox
													key={t}
													display="flex"
													alignItems="center"
													fontFamily="default"
													fontSize="base"
													height="option"
													width="full"
													bg="white"
													paddingLeft="40"
													paddingRight={0}
													color="text"
													boxSizing="border-box"
													_hover={{
														color: "white",
														bg: "clickable",
														cursor: "pointer",
													}}
													onClick={() => {
														onClose()
														setClock(t)
													}}>
													{t}
												</PseudoBox>
											)
										})}
								</AnimatePresence>
							</BoxMotion>
						}
					</BoxMotion>
				</Stack>
			</Box>
		</>
	)
}

const BoxMotion = motion.custom<Omit<BoxProps, "transition" | "style">>(Box)

interface TimeZoneProps {
	disabled?: boolean
	validationState?: ValidationState
}

const TimeZone: React.FC<TimeZoneProps> = p => {
	const { id, timeZone, setTimeZone } = useContext(TimePickerContext)
	const { validationState, disabled } = p
	const onChange: SelectChangeHandler = value => {
		setTimeZone(value)
	}
	return (
		<Box w="320px" pl={24}>
			<FormInput labelText="Time Zone" labelId={`timePickerTimeZoneLabel_${id}`}>
				<Select
					id={`timePickerTimeZone_${id}`}
					options={timeZones}
					size="full"
					value={timeZone}
					disabled={disabled}
					onChange={onChange}
					validationState={validationState}
				/>
			</FormInput>
		</Box>
	)
}

const times: Array<string> = [
	"12:00 AM",
	"12:30 AM",
	"1:00 AM",
	"1:30 AM",
	"2:00 AM",
	"2:30 AM",
	"3:00 AM",
	"3:30 AM",
	"4:00 AM",
	"4:30 AM",
	"5:00 AM",
	"5:30 AM",
	"6:00 AM",
	"6:30 AM",
	"7:00 AM",
	"7:30 AM",
	"8:00 AM",
	"8:30 AM",
	"9:00 AM",
	"9:30 AM",
	"10:00 AM",
	"10:30 AM",
	"11:00 AM",
	"11:30 AM",
	"12:00 PM",
	"12:30 PM",
	"1:00 PM",
	"1:30 PM",
	"2:00 PM",
	"2:30 PM",
	"3:00 PM",
	"3:30 PM",
	"4:00 PM",
	"4:30 PM",
	"5:00 PM",
	"5:30 PM",
	"6:00 PM",
	"6:30 PM",
	"7:00 PM",
	"7:30 PM",
	"8:00 PM",
	"8:30 PM",
	"9:00 PM",
	"9:30 PM",
	"10:00 PM",
	"10:30 PM",
	"11:00 PM",
	"11:30 PM",
]

const timeZones = [
	{ label: "GMT -12 (Baker Island)", value: "-1200" },
	{ label: "GMT -11 (Alofi, Pago Pago)", value: "-1100" },
	{ label: "GMT -10 (Honolulu, Pearl City)", value: "-1000" },
	{ label: "GMT -9 (Anchorage, Juneau)", value: "-0900" },
	{ label: "GMT -8 (Los Angeles, Seattle)", value: "-0800" },
	{ label: "GMT -7 (Denver, Edmonton, Phoenix)", value: "-0700" },
	{ label: "GMT -6 (Dallas, Mexico City)", value: "-0600" },
	{ label: "GMT -5 (Lima, Washington, DC)", value: "-0500" },
	{ label: "GMT -4 (Halifax, La Paz, San Juan, )", value: "-0400" },
	{ label: "GMT -3 (Buenos Aires, Rio de Janeiro)", value: "-0300" },
	{ label: "GMT -2 (Grytviken, King Edward Point)", value: "-0200" },
	{ label: "GMT -1 (Lagoa, Mindelo, Praja)", value: "-0100" },
	{ label: "GMT +0 (Accra, Dakar, London)", value: "+0000" },
	{ label: "GMT +1 (Abuja, Amsterdam, Madrid)", value: "+0100" },
	{ label: "GMT +2 (Cape Town, Beirut, Maputo)", value: "+0200" },
	{ label: "GMT +3 (Baghdad, Djibouti, Moscow)", value: "+0300" },
	{ label: "GMT +4 (Batumi, Dubai, Samara)", value: "+0400" },
	{ label: "GMT +5 (Islamabad, Karachi, Ufa)", value: "+0500" },
	{ label: "GMT +6 (Astana, Biysk, Zhanjiang)", value: "+0600" },
	{ label: "GMT +7 (Bangkok, Da Nang, Jakarta)", value: "+0700" },
	{ label: "GMT +8 (Hong Kong, Macau, Beijing)", value: "+0800" },
	{ label: "GMT +9 (Pyongyang, Seoul, Tokyo)", value: "+0900" },
	{ label: "GMT +10 (Brisbane, Vladivostok)", value: "+1000" },
	{ label: "GMT +11 (Arawa, Auckland, Sydney)", value: "+1100" },
]
