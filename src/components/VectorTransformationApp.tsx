'use client';

import FunctionDomainInput from '@/components/FunctionDomainInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import renderFunctions from '@/util/renderFunctions';
import { useEffect, useState } from 'react';
import functionBreakdown from '@/processor/functions/functionBreakdown';
import TransformationsTable from '@/components/TransformationsTable';
import { ExtendedTransformation } from '@/types/breakdown';
import { Loader } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import generateRandomHexColor from '@/util/generateRandomHexColor';

export default function VectorTransformationApp() {
	const [transformFunction, setTransformFunction] = useState('x^2');
	const [funMode, setFunMode] = useState(false);
	const [domain, setDomain] = useState({
		lowerBound: 0,
		upperBound: 10,
		isLowerInclusive: true,
		isUpperInclusive: true
	});
	const [breakdown, setBreakdown] = useState<{
		originalFunction: string;
		transformations: ExtendedTransformation[];
	}>();
	const handleBreakdown = async () => {
		setLoading(true);
		const bd = await functionBreakdown(transformFunction, funMode);
		bd.transformations = bd.transformations.map((t, i) => {
			return {
				...t,
				id: i.toString(),
				color: generateRandomHexColor(),
				visible: true
			};
		});
		setBreakdown(bd as {
			originalFunction: string;
			transformations: ExtendedTransformation[];
		});
		setLoading(false);
	}
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		renderFunctions(breakdown?.transformations.filter((bd) => bd.visible) || [], [domain.lowerBound, domain.upperBound]);
	}, [breakdown, domain]);
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
							</div>
							<Button onClick={handleBreakdown} className="w-full" disabled={loading}>
								{loading && <Loader className="animate-ping" />}
								Generate Transformation
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Transformation Steps</CardTitle>
						</CardHeader>
						<CardContent>
						<TransformationsTable transformations={breakdown?.transformations || []} setTransformations={(transformations) => {
							if (breakdown) {
								setBreakdown({
									...breakdown,
									transformations
								});
							}
						}}/>
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
				© 2025 Farciarzyt Imalfect 19+ Corporation Spółka Aukcyjna Holding Limited Incorporated. All
				rights reserved.
				<div className={'flex justify-center items-center gap-2 '}>
					<Label	htmlFor="darkMode" className="ml-2">🔥 Fun Mode</Label>
				<Switch	id="darkMode" className="ml-2" onCheckedChange={setFunMode}/>
				</div>
			</footer>
		</div>
	);
}
