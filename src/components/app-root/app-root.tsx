import { Component, Element, Fragment, h, Listen } from "@stencil/core";
import { FilterFunction } from "../../classes/filter-function";
import { FilterData } from "../../interfaces/filter-data";
import { emptyString } from "../../library";
import { appStore } from "../../services/app-store";
import { RangeSlider } from "../range-slider/range-slider";

@Component({
	tag: "app-root",
	styleUrl: "app-root.css"
})
export class AppRoot {
	filters: FilterData;
	mainImage: HTMLImageElement;
	outputTextarea: HTMLTextAreaElement;
	@Element() host: HTMLElement;

	componentWillLoad() {
		appStore.appDataSubject.subscribe(appData => {
			this.filters = appData.filters;
		});
	}

	buildFilterString = (accumulator: string, [name, filter]: [string, FilterFunction]) => {
		return `${accumulator} ${name}(${filter.currentValue})`;
	};

	@Listen("update")
	async onUpdate(event: CustomEvent<RangeSlider>) {
		let currentElement = event.target as HTMLRangeSliderElement;
		let currentFilter = this.filters[currentElement.dataset.filterFunction];
		currentFilter.value = await currentElement.getPosition();
		let output = Object.entries(this.filters).filter(this.isActive).reduce(this.buildFilterString, emptyString).trim();
		this.mainImage.style.filter = output;
		this.outputTextarea.textContent = output !== emptyString ? `filter: ${output};` : output;
		currentFilter = null;
		currentElement = null;
	}

	isActive([_, filter]: [string, FilterFunction]) {
		return filter.currentValue !== filter.defaultValue;
	}

	resetAll() {
		this.host.querySelectorAll("range-slider").forEach(x => x.reset());
	}

	render() {
		return (
			<Fragment>
				<div class="row">
					<h4 class="mb-4 fw-bold">CSS Filter Playground</h4>
				</div>
				<div class="row">
					<div class="col-10">
						<div class="position-relative">
							<img ref={element => this.mainImage = element} class="img-fluid" src="assets/images/scenery.jpg"/>
							<div class="position-absolute top-0 start-0 w-100 mt-4 px-2">
								<div class="d-flex align-items-center mb-2">
									<div class="highlighted">CSS:</div>
									<button class="btn btn-primary border border-warning ms-auto" onClick={() => this.resetAll()}>Reset Image</button>
								</div>
								<textarea ref={element => this.outputTextarea = element} class="form-control"></textarea>
							</div>
						</div>
					</div>
					<div class="col-2">
						<div class="d-flex flex-column justify-content-end">
							{
								Object.entries(this.filters).map(([filterName, filterValue]) => {
									return <range-slider name={`sld-${filterName}`} text={filterName} min={filterValue.min} max={filterValue.max} default={filterValue.default} unit={filterValue.unit} data-filter-function={filterName}/>;
								})
							}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}