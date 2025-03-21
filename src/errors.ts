export enum ErrorCodes {
	unknown = 0,
	armsTooShort = 1,
	mountPointOverlap = 2,
}

export enum ErrorHandlingBehavior {
	continue = 0,
	stop = 1,
}

export class PintographError extends Error {
	constructor(
		public readonly code: keyof typeof ErrorCodes,
		message: string
	) {
		super(message);
	}
}

export type OnErrorCallback = (
	errorCode: keyof typeof ErrorCodes,
	data: unknown | undefined
) => ErrorHandlingBehavior;
