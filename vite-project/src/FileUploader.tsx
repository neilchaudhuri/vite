import React, { useEffect, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { Box, Text, Stack, PseudoBox, BoxProps, Flex, Progress } from "@chakra-ui/core"
import { ErrorMessage } from "./ErrorMessage"
import { CheckSharp, CloudUpload } from "@material-ui/icons"
import { P } from "./Typography"
import { LinkButton } from "./LinkButton"
import "./fileUploader.css"

export enum Display {
	FULL,
	CONDENSED,
}

interface FileUploadProps {
	"display"?: Display
	"allowedFileTypes": string[]
	"required"?: boolean
	"disabled"?: boolean
	"id": string
	"aria-labelledby"?: string
	"name"?: string
	"errorMessage"?: string
	"maxSizeBytes": number
	"progress"?: number
	"showIcon"?: boolean
	"onDrop": (e: DropEvent, files: File[]) => void
	"onUploadCancel"?: () => void
	"handleRejectedFiles"?: (e: DropEvent, files: RejectedFile[]) => void
}

export interface RejectedFile {
	file: File
	errors: string[]
}

interface Styles {
	default: BoxProps
	focusHover: BoxProps
	error: BoxProps
	disabled: BoxProps
}

const styles: Styles = {
	default: {
		backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e
			%3crect width='100%25' height='100%25' fill='none' stroke='%23B2B2B2' stroke-width='2' stroke-dasharray='9%2c 4'
			stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
		bg: "fileUploadBackground",
		color: "text",
		fontSize: "base",
		fontWeight: "normal",
		cursor: "pointer",
	},
	focusHover: {
		backgroundImage: "none",
		bg: "fileUploadBackground",
		// @ts-ignore
		outlineWidth: "2px",
		outlineStyle: "solid",
		outlineColor: "accent",
	},
	error: {
		bg: "fileUploadBackground",
		color: "error",
		fontSize: "base",
		fontWeight: "normal",
		cursor: "pointer",
		outline: "2px solid currentColor",
	},
	disabled: {
		borderWidth: "px",
		borderStyle: "solid",
		borderColor: "label",
		bg: "disabledBackground",
		color: "label",
		fontSize: "base",
		fontWeight: "normal",
	},
}

type DropEvent = React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement> | DragEvent | Event

const defaultRejectedFilesHandler = (e: DropEvent, rejectedFiles: RejectedFile[]) => {
	console.warn(e)
	rejectedFiles.map(f => console.warn(`File ${f.file.name} rejected: ${f.errors.join(",")}`))
}

const generateRejection: (f: FileRejection) => RejectedFile = (f: FileRejection) => {
	return { file: f.file, errors: f.errors.map(e => e.message) }
}

export const FileUploader: React.FC<FileUploadProps> = (p: FileUploadProps) => {
	const {
		progress = 0,
		disabled = false,
		display = Display.FULL,
		handleRejectedFiles = defaultRejectedFilesHandler,
		showIcon = true,
	} = p

	const [style, setStyle] = useState(styles.default)
	const [valid, setValid] = useState(true)
	const [uploading, setUploading] = useState(false)

	useEffect(() => {
		if (disabled) {
			setStyle(styles.disabled)
		} else {
			setStyle(styles.default)
		}
	}, [disabled])
	useEffect(() => {
		if (progress === 100) {
			setTimeout(() => {
				setUploading(false)
			}, 1000)
		}
	}, [progress])

	// eslint-disable-next-line  @typescript-eslint/unbound-method
	const { getRootProps, getInputProps } = useDropzone({
		accept: p.allowedFileTypes,
		minSize: 0,
		maxSize: p.maxSizeBytes,
		multiple: true,
		noKeyboard: false,
		disabled: disabled,
		onDrop: (acceptedFiles: File[], fileRejections: FileRejection[], e: DropEvent) => {
			if (fileRejections.length > 0) {
				setStyle(styles.error)
				setValid(false)
				handleRejectedFiles(
					e,
					fileRejections.map(f => generateRejection(f))
				)
			} else {
				setStyle(styles.default)
				setUploading(true)
				setValid(true)
				p.onDrop(e, acceptedFiles)
			}
		},
	})
	const condensed = display === Display.CONDENSED

	return (
		<Box as="section" aria-labelledby={p["aria-labelledby"]} paddingTop={4}>
			<PseudoBox
				{...getRootProps()}
				{...style}
				_focus={disabled ? styles.disabled : styles.focusHover}
				_hover={disabled ? styles.disabled : styles.focusHover}
				w="100%">
				{!uploading && (
					<Stack
						align="center"
						textAlign="center"
						spacing={12}
						isInline={condensed}
						paddingTop={condensed ? "12" : "24"}
						paddingBottom={condensed ? "12" : "48"}>
						{showIcon && (
							<Box
								as={CloudUpload}
								size={condensed ? "iconMd" : "iconXl"}
								color={disabled ? "currentColor" : "clickable"}
								ml={condensed ? "12" : "0"}
							/>
						)}
						<P color={disabled ? "label" : "text"}>
							Drag and drop or{" "}
							<Text
								as="span"
								m={0}
								color={disabled ? "inherit" : "clickable"}
								display="inline"
								textDecoration={disabled ? "none" : "underline"}>
								browse
							</Text>{" "}
							to upload.
						</P>
						<input {...getInputProps({ id: p.id, name: p.name })} />
					</Stack>
				)}
				{uploading && <UploadDisplay progress={progress} onCancel={p.onUploadCancel} isCondensed={condensed} />}
			</PseudoBox>
			{!valid && p.errorMessage && <ErrorMessage message={p.errorMessage} />}
			{valid && progress === 100 && !uploading && uploadSuccessMessage}
		</Box>
	)
}

interface UploadDisplayProps {
	progress: number
	onCancel?: () => void
	isCondensed?: boolean
}

const UploadDisplay: React.FC<UploadDisplayProps> = p => {
	let value = p.progress
	if (value < 0 || value > 100) {
		console.warn(`${value} is invalid for a progress bar. Setting to 0`)
		value = 0
	}
	return (
		<Box mx={24} paddingTop={p.isCondensed ? "12" : "48"} paddingBottom={p.isCondensed ? "12" : "48"}>
			<Flex justify="space-between" fontFamily="body" mb={4}>
				<P>Uploading...</P>
				{p.onCancel && <LinkButton onClick={p.onCancel}>Cancel</LinkButton>}
			</Flex>
			<Progress
				value={value}
				className="c1ds-progress-track"
				borderRadius="20px"
				backgroundColor="disabledBackground"
				mb={8}
			/>
		</Box>
	)
}

const uploadSuccessMessage = (
	<Stack align="center" spacing={2} isInline={true} color="success">
		<Box as={CheckSharp} role="presentation" size="iconMd" />
		<P color="success">File uploaded successfully!</P>
	</Stack>
)
