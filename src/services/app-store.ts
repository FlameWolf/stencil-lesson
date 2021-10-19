import { BehaviorSubject } from "rxjs";
import { FilterFunction } from "../classes/filter-function";
import { AppData } from "../interfaces/app-data";
import { FilterData } from "../interfaces/filter-data";

class AppStoreService {
	appData: AppData = {
		filters: {
			brightness: new FilterFunction({
				min: 0,
				max: 200,
				unit: "%"
			}),
			contrast: new FilterFunction({
				min: 0,
				max: 200,
				unit: "%"
			}),
			saturate: new FilterFunction({
				min: 0,
				max: 200,
				unit: "%"
			}),
			"drop-shadow": new FilterFunction({
				min: 0,
				max: 50,
				default: 0,
				unit: "px",
				transform: input => `0 0 ${input} #000000`
			}),
			grayscale: new FilterFunction({
				min: 0,
				max: 100,
				default: 0,
				unit: "%"
			}),
			sepia: new FilterFunction({
				min: 0,
				max: 100,
				default: 0,
				unit: "%"
			}),
			invert: new FilterFunction({
				min: 0,
				max: 100,
				default: 0,
				unit: "%"
			}),
			opacity: new FilterFunction({
				min: 0,
				max: 100,
				default: 100,
				unit: "%"
			}),
			"hue-rotate": new FilterFunction({
				min: 0,
				max: 360,
				default: 0,
				unit: "deg"
			}),
			blur: new FilterFunction({
				min: 0,
				max: 50,
				default: 0,
				unit: "px"
			})
		}
	};
	public appDataSubject = new BehaviorSubject<AppData>(this.appData);

	setFilter(filterValue: FilterData) {
		this.appDataSubject.next({
			...this.appData,
			filters: {
				...this.appData.filters,
				...filterValue
			}
		});
	}
}

export const appStore = new AppStoreService();