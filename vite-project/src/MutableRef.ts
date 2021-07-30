export type MutableRef<T> = React.RefCallback<T> | React.MutableRefObject<T | null> | null

export const setMutableRef = <T extends unknown>(elem: T | null, ref?: MutableRef<T>): void => {
	if (typeof ref === "function") {
		ref(elem)
	} else if (ref && typeof ref === "object") {
		ref.current = elem
	}
}
