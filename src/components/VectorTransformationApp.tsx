'use client';

import ColorSchemeSelector from '@/components/ColorSchemeSelector';
import FunctionDomainInput from '@/components/FunctionDomainInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import showFunction from '@/util/showFunction';
import { useState } from 'react';

export default function VectorTransformationApp() {
	const [transformFunction, setTransformFunction] = useState('x^2');
	const [originalColor, setOriginalColor] = useState('#3B82F6');
	const [transformedColor, setTransformedColor] = useState('#10B981');
	const [domain, setDomain] = useState({
		lowerBound: 0,
		upperBound: 10,
		isLowerInclusive: true,
		isUpperInclusive: true
	});
	const handleGenerate = () => {
		// Placeholder for generate functionality
		console.log(transformFunction);
		console.log(transformedColor);
		console.log([domain.lowerBound, domain.upperBound]);
		showFunction(transformFunction, transformedColor, [
			domain.lowerBound !== null ? domain.lowerBound : -Infinity,
			domain.upperBound !== null ? domain.upperBound : Infinity
		]);
	};
	return (
		<div className="mx-6 mt-6 space-y-8 md:mx-12">
			<h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-4xl font-bold text-transparent">
				Vector Vortex: Transform Your Functions!
			</h1>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Input Your Transformation</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="transformFunction">Vector Transformation Function</Label>
								<Input
									id="transformFunction"
									placeholder="e.g., (x-3)^2-12"
									value={transformFunction}
									onChange={(e) => setTransformFunction(e.target.value)}
								/>
							</div>
							<div className={'flex flex-wrap gap-6'}>
								<FunctionDomainInput
									onInputUpdate={(e) => {
										setDomain({
											lowerBound: e.lowerBound ?? 0,
											upperBound: e.upperBound ?? 10,
											isLowerInclusive: e.isLowerInclusive,
											isUpperInclusive: e.isUpperInclusive
										});
									}}
								/>
								<ColorSchemeSelector
									onColorUpdate={(e) => {
										setOriginalColor(e.originalColor);
										setTransformedColor(e.transformedColor);
									}}
								/>
							</div>
							<Button onClick={handleGenerate} className="w-full">
								Generate Transformation
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Transformation Steps</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="min-h-[200px] rounded-lg border bg-gray-50 p-4">
								<p className="text-gray-500">
									Step-by-step transformation will be displayed here using KaTeX.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Transformation Result</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="relative flex min-h-[400px] items-center justify-center rounded-lg border bg-gray-50 p-4">
							<p className="absolute z-0 text-gray-500">Your graph will be displayed here</p>
							<div id="graph" className={'z-10'}></div>
						</div>
					</CardContent>
				</Card>
			</div>

			<footer className="mt-8 text-center text-sm text-gray-500">
				© 2024 Farciarzyt Imalfect 19+ Corporation Spółka Aukcyjna Holding Limited Incorporated. All
				rights reserved.
			</footer>
		</div>
	);
}
