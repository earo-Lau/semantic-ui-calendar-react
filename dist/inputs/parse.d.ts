import * as moment from 'moment';
export declare const TIME_FORMAT: {
    24: string;
    AMPM: string;
    ampm: string;
};
declare type ParseValueData = string | moment.Moment | Date;
/** Parse string, moment, Date.
 *
 * Return unedfined on invalid input.
 */
export declare function parseValue(value: ParseValueData, dateFormat: string): moment.Moment;
declare type ParseArrayOrValueData = ParseValueData | ParseValueData[];
/** Parse string, moment, Date, string[], moment[], Date[].
 *
 * Return array of moments. Returned value contains only valid moments.
 * Return undefined if none of the input values are valid.
 */
export declare function parseArrayOrValue(data: ParseArrayOrValueData, dateFormat: string): moment.Moment[];
interface DateParams {
    year?: number;
    month?: number;
    date?: number;
    hour?: number;
    minute?: number;
}
interface GetInitializerParams {
    initialDate?: ParseValueData;
    dateFormat?: string;
    dateParams?: DateParams;
}
/** Create moment.
 *
 * Creates moment using `dateParams` or `initialDate` arguments (if provided).
 * Precedense order: dateParams -> initialDate -> default value
 */
export declare function getInitializer(context: GetInitializerParams): moment.Moment;
declare type InitialDate = string | moment.Moment | Date;
declare type DateValue = InitialDate;
/** Return initial date if `value` is empty and if `initialDate` provided. */
export declare function chooseValue(value: string, initialDate?: InitialDate): DateValue;
export declare function dateValueToString(value: DateValue, dateFormat: string): string;
interface Range {
    start?: moment.Moment;
    end?: moment.Moment;
}
/**
 * Extract start and end dates from input string.
 * Return { start: Moment|undefined, end: Moment|undefined }
 * @param {string} inputString Row input string from user
 * @param {string} dateFormat Moment formatting string
 * @param {string} inputSeparator Separator for split inputString
 */
export declare function parseDatesRange(inputString?: string, dateFormat?: string, inputSeparator?: string): Range;
export {};
