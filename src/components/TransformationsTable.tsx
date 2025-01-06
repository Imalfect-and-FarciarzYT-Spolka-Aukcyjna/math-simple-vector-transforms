import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExtendedTransformation } from '@/types/breakdown';

export default function TransformationsTable(props: {
	transformations: ExtendedTransformation[];
	// eslint-disable-next-line no-unused-vars
	setTransformations: (transformations: ExtendedTransformation[]) => void;
}) {
	return (
		<Table>
			<TableCaption>A list of the transformations.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Function</TableHead>
					<TableHead>Transformation</TableHead>
					<TableHead>Color</TableHead>
					<TableHead>Show</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{
					props.transformations.reverse().map((transformation) => {
						return (
							<TableRow key={transformation.id}>
								<TableCell className="font-medium">{transformation.transformedFunction}</TableCell>
								<TableCell>{transformation.description}</TableCell>
								<TableCell> <input
									type="color"
									value={transformation.color}
									onChange={(e) => {
										props.setTransformations(
											props.transformations.map((t) => {
												if (t.id === transformation.id) {
													return {
														...t,
														color: e.target.value
													};
												}
												return t;
											})
										);
									}}
									id="originalColor"
									className="h-10 w-10 rounded-md border border-gray-300"
								/></TableCell>
								<TableCell>
									<Button onClick={() => {
										props.setTransformations(
											props.transformations.map((t) => {
												if (t.id === transformation.id) {
													return {
														...t,
														visible: !t.visible
													};
												}
												return t;
											})
										);
									}}>{transformation.visible ? <LucideEye /> : <LucideEyeOff />}</Button>
								</TableCell>
							</TableRow>
						);
					})
				}
			</TableBody>
		</Table>
	);
}