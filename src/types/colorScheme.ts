export interface ColorSchemeEvent {
	originalColor: string;
	transformedColor: string;
}

export interface ColorSchemeSelectorProps {
	onColorUpdate?: (event: ColorSchemeEvent) => void;
}
