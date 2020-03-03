import { PagingData } from "./paging.data";
import { FilterData } from "./filter.data";
import { SortingData } from "./sorting.data";

export class OptionGridData {
    local?: boolean;
    columns?: string[];
    paging?: PagingData;
    filters?: FilterData[];
    orders?: SortingData[];
}