import { FilterFunction } from "../classes/filter-function";

export interface FilterData {
	[key: string]: FilterFunction;
}