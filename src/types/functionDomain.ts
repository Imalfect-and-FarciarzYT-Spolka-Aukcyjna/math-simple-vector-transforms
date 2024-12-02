export interface DomainInputEvent {
	lowerBound: number | null;
	upperBound: number | null;
	isLowerInclusive: boolean;
	isUpperInclusive: boolean;
}

export interface FunctionDomainInputProps {
	onInputUpdate?: (event: DomainInputEvent) => void;
}
