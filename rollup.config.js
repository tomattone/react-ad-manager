import typescript from "rollup-plugin-typescript2"

import packageJSON from "./package.json"

export default {
	input: "src/index.ts",
	output: [
		{
			file: packageJSON.main,
			format: "cjs",
			exports: "named",
			sourcemap: true,
			strict: false
		}
	],
	plugins: [typescript()],
	external: ["react", "react-dom"]
}
