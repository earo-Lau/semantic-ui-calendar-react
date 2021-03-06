/// <reference types="react" />
import * as PropTypes from 'prop-types';
import BaseInput, { BaseInputProps, BaseInputState, MultimodeProps, TimeRelatedProps } from './BaseInput';
declare type CalendarMode = 'hour' | 'minute';
export declare type TimeInputProps = BaseInputProps & MultimodeProps & TimeRelatedProps;
export interface TimeInputOnChangeData extends TimeInputProps {
    value: string;
}
interface TimeInputState extends BaseInputState {
    mode: CalendarMode;
}
declare class TimeInput extends BaseInput<TimeInputProps, TimeInputState> {
    /**
     * Component responsibility:
     *  - parse time input string
     *  - switch between modes ['hour', 'minute']
     *  - handle HourPicker/MinutePicker change (format { hour: number, minute: number } into output time string)
     */
    static readonly defaultProps: {
        icon: string;
        timeFormat: string;
        disableMinute: boolean;
        inline: boolean;
    };
    static readonly propTypes: {
        /** Currently selected value. */
        value: PropTypes.Requireable<string>;
        /** One of ["24", "AMPM", "ampm"] */
        timeFormat: PropTypes.Requireable<string>;
        /** If true, popup closes after selecting a date-time. */
        closable: PropTypes.Requireable<boolean>;
        /** If true, minutes picker won't be shown after picking the hour. */
        disableMinute: PropTypes.Requireable<boolean>;
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
    private handleSelectUndelayed;
    private switchToNextMode;
    private getPicker;
}
export default TimeInput;
