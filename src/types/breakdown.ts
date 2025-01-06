export interface FunctionTransformation {
    transformedFunction: string
    description: string
}
export interface FunctionBreakdownResponse {
    originalFunction: string
    transformations: FunctionTransformation[]
}
export type ExtendedTransformation = FunctionTransformation & { id: string, color: string, visible: boolean };
