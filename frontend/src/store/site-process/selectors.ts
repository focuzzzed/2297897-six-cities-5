import { StoreSlice } from '../../const';
import type { State } from '../../types';
import type { City, SortName } from '../../types';

export const getCity = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): City => SITE_PROCESS.city;
export const getSorting = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): SortName => SITE_PROCESS.sorting;
