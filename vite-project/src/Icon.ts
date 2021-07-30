import SvgIcon from "@material-ui/core/SvgIcon"
import { MouseEventHandler } from "react"

export interface Icon {
	mdIcon: typeof SvgIcon
	color?: string
}

type ImageInputIcon = Icon & { alignment: IconAlignment }
type ClickableInputIcon = ImageInputIcon & { onClick: MouseEventHandler<SVGElement>; ariaLabel: string }

/**
 * Type guard to determine if an input icon
 * is a clickable icon
 *
 * @param icon input icon
 */
export const isClickableIcon = (icon: ImageInputIcon | ClickableInputIcon): icon is ClickableInputIcon => {
	return (icon as ClickableInputIcon).onClick !== undefined
}

export type InputIcon = ImageInputIcon | ClickableInputIcon

export enum IconAlignment {
	LEFT,
	RIGHT,
}
