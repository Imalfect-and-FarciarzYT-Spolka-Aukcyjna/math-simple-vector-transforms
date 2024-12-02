import functionPlot from 'function-plot';

export default function showFunction(
	functionString: string,
	functionColor: string,
	domain: [number, number]
) {
	functionPlot({
		target: '#graph',
		width: 800,
		height: 600,
		xAxis: { domain: [-1, 1] },
		grid: true,
		data: [
			{
				range: domain,
				fn: functionString,
				color: functionColor
			}
		]
	});
}
