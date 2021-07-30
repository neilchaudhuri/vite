import * as React from "react"

type ElementValidatorFunction = <T extends unknown>(
	accumulator: React.ReactElement<T>[],
	current: React.ReactElement<T>
) => React.ReactElement<T>[]

export const elementValidator: ElementValidatorFunction = <T>(a: React.ReactElement<T>[], c: React.ReactElement<T>) => {
	if (React.isValidElement(c)) {
		return [...a, c]
	} else {
		console.warn("Child is not valid")
		return a
	}
}
