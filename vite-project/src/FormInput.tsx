import { FormControl, FormLabel, Text } from "@chakra-ui/core"
import * as React from "react"

type FormInputProps = {
	labelText: string
	labelId: string
	required?: boolean
	disabled?: boolean
	gridColumn?: string
	children: React.ReactElement<React.InputHTMLAttributes<HTMLElement>>
}

export const FormInput: React.FC<FormInputProps> = (p: FormInputProps) => {
	const { labelText, labelId, children, required, gridColumn = "1 / -1", ...input } = p

	return (
		<FormControl gridColumn={gridColumn}>
			<FormLabel
				id={labelId}
				fontFamily="body"
				fontSize="label"
				fontWeight="normal"
				pb={0}
				color="label"
				display="block"
				lineHeight="normal">
				{required && (
					<Text color="required" as="span">
						*&nbsp;
					</Text>
				)}
				{labelText}
			</FormLabel>
			{React.cloneElement(children, {
				required,
				"aria-labelledby": `${labelId} ${children.props["aria-labelledby"] ?? ""}`.trim(),
				...input,
			})}
		</FormControl>
	)
}
