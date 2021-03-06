/// <reference types="react" />
import * as PropTypes from 'prop-types';
import BaseInput, { BaseInputProps, BaseInputState, DateRelatedProps, DisableValuesProps, EnableValuesProps, MinMaxValueProps, MultimodeProps } from './BaseInput';
declare type CalendarMode = 'year' | 'month' | 'day';
export interface DateInputProps extends BaseInputProps, DateRelatedProps, MultimodeProps, DisableValuesProps, EnableValuesProps, MinMaxValueProps {
    /** Display mode to start. */
    startMode?: CalendarMode;
}
export interface DateInputOnChangeData extends DateInputProps {
    value: string;
}
interface DateInputState extends BaseInputState {
    mode: CalendarMode;
    year: number;
    month: number;
    date: number;
}
declare class DateInput extends BaseInput<DateInputProps, DateInputState> {
    /**
     * Component responsibility:
     *  - parse input value
     *  - handle underlying picker change
     */
    static readonly defaultProps: {
        dateFormat: string;
        startMode: string;
        preserveViewMode: boolean;
        inline: boolean;
        icon: string;
    };
    static readonly propTypes: {
        /** Currently selected value. */
        value: PropTypes.Validator<string>;
        /** Moment date formatting string. */
        dateFormat: PropTypes.Requireable<string>;
        /** Date to display initially when no date is selected. */
        initialDate: PropTypes.Requireable<string | {} | Date>;
        /** Date or list of dates that are displayed as disabled. */
        disable: PropTypes.Requireable<string | {} | Date | {}[]>;
        /** Date or list of dates that are enabled (the rest are disabled). */
        enable: PropTypes.Requireable<string | {} | Date | {}[]>;
        /** Maximum date that can be selected. */
        maxDate: PropTypes.Requireable<string | {} | Date>;
        /** Minimum date that can be selected. */
        minDate: PropTypes.Requireable<string | {} | Date>;
        /** Preserve viewmode on focus? */
        preserveViewMode: PropTypes.Requireable<boolean>;
        /** Display mode to start. */
        startMode: PropTypes.Requireable<string>;
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
    constructor(props: DateInputProps);
    render(): JSX.Element;
    private getDateParams;
    private getPicker;
    private switchToNextModeUndelayed;
    private switchToNextMode;
    private switchToPrevModeUndelayed;
    private switchToPrevMode;
    private onFocus;
    private handleSelect;
}
export default DateInput;
