'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DomainInputEvent, FunctionDomainInputProps } from '@/types/functionDomain';
import { useEffect, useState } from 'react';

export default function FunctionDomainInput({ onInputUpdate }: FunctionDomainInputProps) {
	const [lowerBound, setLowerBound] = useState<number | null>(null);
	const [upperBound, setUpperBound] = useState<number | null>(null);
	const [isLowerInclusive, setIsLowerInclusive] = useState(true);
	const [isUpperInclusive, setIsUpperInclusive] = useState(true);
	const [isLowerInfinity, setIsLowerInfinity] = useState(false);
	const [isUpperInfinity, setIsUpperInfinity] = useState(false);

	useEffect(() => {
		if (onInputUpdate) {
			const event: DomainInputEvent = {
				lowerBound: isLowerInfinity ? -Infinity : lowerBound,
				upperBound: isUpperInfinity ? Infinity : upperBound,
				isLowerInclusive,
				isUpperInclusive
			};
			onInputUpdate(event);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lowerBound, upperBound, isLowerInclusive, isUpperInclusive, isLowerInfinity, isUpperInfinity]);

	const getDomainNotation = () => {
		if (!isLowerInfinity && lowerBound === null) return 'Enter lower bound';
		if (!isUpperInfinity && upperBound === null) return 'Enter upper bound';

		const lowerBracket = isLowerInclusive ? '[' : '(';
		const upperBracket = isUpperInclusive ? ']' : ')';
		const lowerValue = isLowerInfinity ? '-∞' : lowerBound;
		const upperValue = isUpperInfinity ? '∞' : upperBound;

		return `x ∈ ${lowerBracket}${lowerValue}, ${upperValue}${upperBracket}`;
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-center text-2xl font-bold">Function Domain Input</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex space-x-4">
					<div className="flex-1 space-y-2">
						<Label htmlFor="lowerBound">Lower Bound</Label>
						<Input
							id="lowerBound"
							type="number"
							value={isLowerInfinity ? '-∞' : (lowerBound ?? '')}
							onChange={(e) => setLowerBound(e.target.value ? Number(e.target.value) : null)}
							placeholder="Enter lower bound"
							disabled={isLowerInfinity}
						/>
					</div>
					<div className="flex-1 space-y-2">
						<Label htmlFor="upperBound">Upper Bound</Label>
						<Input
							id="upperBound"
							type="number"
							value={isUpperInfinity ? '∞' : (upperBound ?? '')}
							onChange={(e) => setUpperBound(e.target.value ? Number(e.target.value) : null)}
							placeholder="Enter upper bound"
							disabled={isUpperInfinity}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Switch
							id="lowerInclusive"
							checked={isLowerInclusive}
							onCheckedChange={setIsLowerInclusive}
							disabled={isLowerInfinity}
						/>
						<Label htmlFor="lowerInclusive">Lower Bound Inclusive</Label>
					</div>
					<div className="flex items-center space-x-2">
						<Switch
							id="upperInclusive"
							checked={isUpperInclusive}
							onCheckedChange={setIsUpperInclusive}
							disabled={isUpperInfinity}
						/>
						<Label htmlFor="upperInclusive">Upper Bound Inclusive</Label>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Switch
							id="lowerInfinity"
							checked={isLowerInfinity}
							onCheckedChange={(checked) => {
								setIsLowerInfinity(checked);
								if (checked) {
									setLowerBound(null);
									setIsLowerInclusive(false);
								}
							}}
						/>
						<Label htmlFor="lowerInfinity">Lower Bound Negative&nbsp;Infinity -∞</Label>
					</div>
					<div className="flex items-center space-x-2">
						<Switch
							id="upperInfinity"
							checked={isUpperInfinity}
							onCheckedChange={(checked) => {
								setIsUpperInfinity(checked);
								if (checked) {
									setUpperBound(null);
									setIsUpperInclusive(false);
								}
							}}
						/>
						<Label htmlFor="upperInfinity">Upper Bound Infinity +∞</Label>
					</div>
				</div>
				<div className="mt-6 text-center">
					<h3 className="mb-2 text-lg font-semibold">Function Domain:</h3>
					<p className="text-2xl font-bold" aria-live="polite">
						{getDomainNotation()}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
