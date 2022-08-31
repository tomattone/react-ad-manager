let internalNetworkCode: string | number = ""
export const networkCode = {
	get: () => internalNetworkCode,
	set: (nc: string | number) => internalNetworkCode = nc
}

let internalRefreshTimer: number | string | null = null
export const refreshTimer = {
	get: () => internalRefreshTimer,
	set: (rt: number | string) => internalRefreshTimer = rt
}