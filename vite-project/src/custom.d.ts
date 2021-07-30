declare module "*.svg" {
	import * as React from "react"
	const ReactSvgComponent: React.FC<React.SVGProps<SVGSVGElement>>
	export default ReactSvgComponent
}
