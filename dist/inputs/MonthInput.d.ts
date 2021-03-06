/// <reference types="react" />
import * as PropTypes from 'prop-types';
import BaseInput, { BaseInputProps, BaseInputState, DateRelatedProps, DisableValuesProps, MinMaxValueProps } from './BaseInput';
export declare type MonthInputProps = BaseInputProps & DateRelatedProps & DisableValuesProps & MinMaxValueProps;
export interface MonthInputOnChangeData extends MonthInputProps {
    value: string;
}
declare class MonthInput extends BaseInput<MonthInputProps, BaseInputState> {
    static readonly defaultProps: {
        dateFormat: string;
        icon: string;
        inline: boolean;
    };
    static readonly propTypes: {
        /** Called on selected value change. */
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        /** Currently selected value. */
        value: PropTypes.Requireable<string>;
        /** Moment date formatting string. */
        dateFormat: PropTypes.Requireable<string>;
        /** Date to display initially when no date is selected. */
        initialDate: PropTypes.Requireable<string | {} | Date>;
        /** Date or list of dates that are displayed as disabled. */
        disable: PropTypes.Requireable<string | {} | Date | {}[]>;
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
export default MonthInput;
