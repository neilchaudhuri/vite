import React, { useEffect, useState } from "react"
import { FormInput } from "../src/FormInput"
import { Display, FileUploader } from "../src/FileUploader"
import { Button } from "../src/Button"
import { ThemeProvider, Box } from "@chakra-ui/core"
import { useForm } from "react-hook-form"
import theme from "../theme.js"

export default {
	title: "FileUploader",
}

export const defaultUploader = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="Attachment" labelId="defaultLabel">
			<FileUploader
				id="defaultUploader"
				name="defaultFileUpload"
				allowedFileTypes={[".png"]}
				maxSizeBytes={100000}
				onDrop={e => console.log("Dropped")}
				errorMessage="ErrorMessage. Corrective action."
			/>
		</FormInput>
	</ThemeProvider>
)

export const condensedUploader = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="Attachment" labelId="condensedLabel">
			<FileUploader
				id="condensedUploader"
				name="condensedFileUpload"
				allowedFileTypes={[".png"]}
				maxSizeBytes={1000}
				display={Display.CONDENSED}
				onDrop={e => console.log("Dropped")}
			/>
		</FormInput>
	</ThemeProvider>
)

export const disabledUploader = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="Attachment" labelId="disabledLabel" disabled>
			<FileUploader
				id="disabledUploader"
				name="condensedFileUpload"
				allowedFileTypes={[".png"]}
				maxSizeBytes={1000}
				onDrop={e => console.log("Dropped")}
			/>
		</FormInput>
	</ThemeProvider>
)

export const formUploader = () => {
	const { register, handleSubmit, setValue } = useForm()
	const [uploadProgress, setUploadProgress] = useState(0)

	useEffect(() => {
		register({ name: "formFileUpload" })
	}, [register])

	const onSubmit = data => {
		console.log("submitting!")
		console.log(data.formFileUpload)
	}

	const uploadFile = () => {
		setUploadProgress(0)
		const interval = setInterval(() => {
			setUploadProgress(curUploadProgress => {
				if (curUploadProgress < 100) {
					return curUploadProgress + 5
				} else {
					clearInterval(interval)
					return 100
				}
			})
		}, 50)
	}

	return (
		<ThemeProvider theme={theme}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput labelText="Attachment" labelId="formLabel">
					<FileUploader
						id="formUploader"
						name="formFileUpload"
						allowedFileTypes={[".png"]}
						maxSizeBytes={100000}
						onDrop={(_, files) => {
							console.log("Dropped")
							setValue("formFileUpload", files)
							uploadFile()
						}}
						errorMessage="ErrorMessage. Corrective action."
						progress={uploadProgress}
					/>
				</FormInput>
				<Box marginTop="8">
					<Button type="submit">Submit</Button>
				</Box>
			</form>
		</ThemeProvider>
	)
}
