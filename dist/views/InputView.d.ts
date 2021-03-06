import * as React from 'react';
import { SemanticTRANSITIONS } from 'semantic-ui-react';
interface InputViewProps {
    /** Used for passing input dom node (input field or inline calendar) to parent component. */
    onMount: (e: HTMLElement) => void;
    /** Called after input field value has changed. */
    onChange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
    closePopup: () => void;
    openPopup: () => void;
    /** Called on input focus. */
    onFocus?: () => void;
    /** Function for rendering component. */
    render?: (props: any) => React.ReactNode;
    /** Called after clear icon has clicked. */
    onClear?: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
    /** Picker. */
    children?: React.ReactNode;
    /** Whether to close a popup when cursor leaves it. */
    closeOnMouseLeave?: boolean;
    /** A field can have its label next to instead of above it. */
    inlineLabel?: boolean;
    /** Using the clearable setting will let users remove their selection from a calendar. */
    clearable?: boolean;
    /** Optional Icon to display inside the Input. */
    icon?: any;
    /** Optional Icon to display inside the clearable Input. */
    clearIcon?: any;
    /** Whether popup is closed. */
    popupIsClosed?: boolean;
    /** The node where the picker should mount. */
    mountNode?: HTMLElement;
    /** Input element tabindex. */
    tabIndex?: string | number;
    /** Whether to display inline picker or picker inside a popup. */
    inline?: boolean;
    /** Duration of the CSS transition animation in milliseconds. */
    duration?: number;
    /** Named animation event to used. Must be defined in CSS. */
    animation?: SemanticTRANSITIONS;
    /** Where to display popup. */
    popupPosition?: 'top left' | 'top right' | 'bottom right' | 'bottom left' | 'right center' | 'left center' | 'top center' | 'bottom center';
    /** Currently selected value. */
    value?: string;
    /** Picker width (any value that `style.width` can take). */
    pickerWidth?: string;
    /** Style object for picker. */
    pickerStyle?: object;
}
declare class InputView extends React.Component<InputViewProps, any> {
    static defaultProps: {
        inline: boolean;
        closeOnMouseLeave: boolean;
        tabIndex: string;
        clearable: boolean;
        icon: string;
        clearIcon: string;
        animation: string;
        duration: number;
    };
    private inputNode;
    private popupNode;
    private mouseLeaveTimeout;
    render(): {};
    scrollListener: () => void;
    private setScrollListener;
    private unsetScrollListener;
}
export default InputView;
