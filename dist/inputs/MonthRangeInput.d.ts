/// <reference types="react" />
import * as PropTypes from 'prop-types';
import BaseInput, { BaseInputProps, BaseInputState, DateRelatedProps, MinMaxValueProps } from './BaseInput';
import { MonthRangePickerOnChangeData } from '../pickers/monthPicker/MonthRangePicker';
import { MonthInputProps } from './MonthInput';
export declare type MonthRangeInputProps = BaseInputProps & DateRelatedProps & MinMaxValueProps;
export interface MonthRangeInputOnChangeData extends MonthInputProps {
    value: string;
    date: MonthRangePickerOnChangeData;
}
declare class MonthRangeInput extends BaseInput<MonthRangeInputProps, BaseInputState> {
    static readonly defaultProps: {
        dateFormat: string;
        icon: string;
        inline: boolean;
    };
    static readonly propTypes: {
        /** Currently selected value. */
        value: PropTypes.Requireable<string>;
        /** Moment date formatting string. */
        dateFormat: PropTypes.Requireable<string>;
        /** Date to display initially when no date is selected. */
        initialDate: PropTypes.Requireable<string | {} | Date>;
        /** Maximum date that can be selected. */
        maxDate: PropTypes.Requireable<string | {} | Date>;
        /** Minimum date that can be selected. */
        minDate: PropTypes.Requireable<string | {} | Date>;
        /** If true, popup closes after selecting a date-time. */
        closable: PropTypes.Requireable<boolean>;
        /**
         * Called on clear.
         *
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {object} data - All props and proposed value.
         */
        onClear: PropTypes.Requireable<(...args: any[]) => any>;
        /** Using the clearable setting will let users remove their selection from a calendar. */
        clearable: PropTypes.Requireable<boolean>;
        /** Optional Icon to display inside the clearable Input. */
        clearIcon: PropTypes.Requireable<any>;
        /** Duration of the CSS transition animation in milliseconds. */
        duration: PropTypes.Requireable<number>;
        /** Named animation event to used. Must be defined in CSS. */
        animation: PropTypes.Requireable<string>;
    };
    constructor(props: any);
    render(): JSX.Element;
    private handleSelect;
}
export default MonthRangeInput;
