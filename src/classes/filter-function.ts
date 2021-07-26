export class FilterFunction {
	min: number;
	max: number;
	default?: number;
	value?: number;
	unit: string;
	transform?: (input: any) => string;

	constructor(source: Partial<FilterFunction>) {
		if(source) {
			this.min = source.min;
			this.max = source.max;
			this.default = source.default !== undefined ? source.default : (this.max < this.min) ? this.min : (this.min + ((this.max - this.min) / 2));
			this.value = source.value;
			this.unit = source.unit;
			this.transform = source.transform ? source.transform : (input) => input;
		}
	}

	get defaultValue() {
		return this.transform(`${this.default}${this.unit}`);
	}

	get currentValue() {
		return this.transform(`${this.value}${this.unit}`);
	}
}