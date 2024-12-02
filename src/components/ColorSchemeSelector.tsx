'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ColorSchemeEvent, ColorSchemeSelectorProps } from '@/types/colorScheme';
import { useEffect, useState } from 'react';

export default function ColorSchemeSelector({ onColorUpdate }: ColorSchemeSelectorProps) {
	const [originalColor, setOriginalColor] = useState('#000000');
	const [transformedColor, setTransformedColor] = useState('#000000');

	useEffect(() => {
		if (onColorUpdate) {
			const event: ColorSchemeEvent = {
				originalColor,
				transformedColor
			};
			onColorUpdate(event);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [originalColor, transformedColor]);

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-center text-2xl font-bold">Color Scheme</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="originalColor">Original Color</Label>
					<div className="flex items-center space-x-2">
						<input
							type="color"
							id="originalColor"
							value={originalColor}
							onChange={(e) => setOriginalColor(e.target.value)}
							className="h-10 w-10 rounded-md border border-gray-300"
						/>
						<input
							type="text"
							value={originalColor}
							onChange={(e) => setOriginalColor(e.target.value)}
							className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="#000000"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="transformedColor">Transformed Color</Label>
					<div className="flex items-center space-x-2">
						<input
							type="color"
							id="transformedColor"
							value={transformedColor}
							onChange={(e) => setTransformedColor(e.target.value)}
							className="h-10 w-10 rounded-md border border-gray-300"
						/>
						<input
							type="text"
							value={transformedColor}
							onChange={(e) => setTransformedColor(e.target.value)}
							className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="#000000"
						/>
					</div>
				</div>
				<div className="mt-6 space-y-2">
					<div className="flex space-x-4">
						<div className="flex-1 space-y-1">
							<div
								className="h-20 rounded-md"
								style={{ backgroundColor: originalColor }}
								aria-label="Original color preview"
							/>
							<p className="text-center text-sm">Original Color</p>
						</div>
						<div className="flex-1 space-y-1">
							<div
								className="h-20 rounded-md"
								style={{ backgroundColor: transformedColor }}
								aria-label="Transformed color preview"
							/>
							<p className="text-center text-sm">Transformed Color</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
