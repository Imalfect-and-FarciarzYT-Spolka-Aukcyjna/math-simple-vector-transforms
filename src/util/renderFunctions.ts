import functionPlot from 'function-plot';
import { ExtendedTransformation } from '@/types/breakdown';

export default function renderFunctions(
	functions: ExtendedTransformation[],
	domain: [number, number]
) {
	functionPlot({
		target: '#graph',
		width: 800,
		height: 600,
		xAxis: { domain: [-1, 1] },
		grid: true,
		data: functions.map((f) => {
			return {
				range: domain,
				fn: f.transformedFunction,
				color: f.color
			};
		})
	});
}
