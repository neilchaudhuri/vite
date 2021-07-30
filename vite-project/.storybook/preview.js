export const parameters = {
	viewport: {
		viewports: {
			xs: {
				name: "XS",
				styles: {
					height: "568px",
					width: "320px",
				},
				type: "mobile",
			},
			sm: {
				name: "SM",
				styles: {
					height: "896px",
					width: "480px",
				},
				type: "mobile",
			},
			md: {
				name: "MD",
				styles: {
					height: "1112px",
					width: "768px",
				},
				type: "tablet",
			},
			lg: {
				name: "LG",
				styles: {
					height: "1112px",
					width: "1024px",
				},
				type: "desktop",
			},
			xl: {
				name: "XL",
				styles: {
					height: "1112px",
					width: "1280px",
				},
				type: "desktop",
			},
		},
		defaultViewport: "xs",
	},
}
