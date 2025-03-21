export enum ErrorCodes {
	Unknown = 0,
	ArmsTooShort = 1,
	MountPointOverlap = 2,
}

export enum ErrorHandlingBehavior {
	Continue = 0,
	Stop = 1,
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
