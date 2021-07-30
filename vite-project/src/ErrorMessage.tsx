import * as React from "react"
import { FormHelperText, BoxProps } from "@chakra-ui/core"

type ErrorMessageProps = BoxProps & { message: string }

export const ErrorMessage: React.FC<ErrorMessageProps> = (p: ErrorMessageProps) => {
	const { message, ...boxProps } = p
	return (
		<FormHelperText {...boxProps} color="error" fontSize="error" mt={0} overflowWrap="normal" w="full">
			{message}
		</FormHelperText>
	)
}
