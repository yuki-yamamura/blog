export type AllNonNullable<T> = {
	[K in keyof T]-?: NonNullable<T[K]>;
};
