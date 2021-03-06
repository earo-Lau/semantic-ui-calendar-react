/// <reference types="react" />
import * as PropTypes from 'prop-types';
import BaseInput, { BaseInputProps, BaseInputState, DateRelatedProps, DisableValuesProps, MinMaxValueProps, MultimodeProps, TimeRelatedProps } from './BaseInput';
declare type CalendarMode = 'year' | 'month' | 'day' | 'hour' | 'minute';
export interface DateTimeInputProps extends BaseInputProps, DateRelatedProps, TimeRelatedProps, MultimodeProps, DisableValuesProps, MinMaxValueProps {
    startMode?: 'year' | 'month' | 'day';
    /** Date and time divider. */
    divider?: string;
    /** Preserve last mode (day, hour, minute) each time user opens dialog. */
    preserveViewMode?: boolean;
    /** Datetime formatting string. */
    dateTimeFormat?: string;
}
export interface DateTimeInputOnChangeData extends DateTimeInputProps {
    value: string;
}
interface DateTimeInputState extends BaseInputState {
    mode: CalendarMode;
    year: number;
    month: number;
    date: number;
    hour: number;
    minute: number;
}
declare class DateTimeInput extends BaseInput<DateTimeInputProps, DateTimeInputState> {
    /**
     * Component responsibility:
     *  - parse input value
     *  - handle underlying picker change
     */
    static readonly defaultProps: {
        dateFormat: string;
        timeFormat: string;
        startMode: string;
        divider: string;
        icon: string;
        preserveViewMode: boolean;
        inline: boolean;
    };
    static readonly propTypes: {
        /** Currently selected value. */
        value: PropTypes.Requireable<string>;
        /** Moment datetime formatting string */
        dateTimeFormat: PropTypes.Requireable<string>;
        /** Moment date formatting string. */
        dateFormat: PropTypes.Requireable<string>;
        /** Time format ["AMPM", "ampm", "24"] */
        timeFormat: PropTypes.Requireable<string>;
        /** Date to display initially when no date is selected. */
        initialDate: PropTypes.Requireable<string | {} | Date>;
        /** Date or list of dates that are displayed as disabled. */
        disable: PropTypes.Requireable<string | {} | Date | {}[]>;
        /** Maximum date that can be selected. */
        maxDate: PropTypes.Requireable<string | {} | Date>;
        /** Minimum date that can be selected. */
        minDate: PropTypes.Requireable<string | {} | Date>;
        /** Preserve viewmode on focus? */
        preserveViewMode: PropTypes.Requireable<boolean>;
        /** Display mode to start. */
        startMode: PropTypes.Requireable<string>;
        /** Date and time divider. */
        divider: PropTypes.Requireable<string>;
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
    constructor(props: DateTimeInputProps);
    render(): JSX.Element;
    private getDateParams;
    private getDateTimeFormat;
    private getPicker;
    private switchToNextModeUndelayed;
    private switchToNextMode;
    private switchToPrevModeUndelayed;
    private switchToPrevMode;
    private handleSelect;
    private onFocus;
    private handleSelectUndelayed;
}
export default DateTimeInput;
