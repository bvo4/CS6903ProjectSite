import React, { InputHTMLAttributes, ReactNode } from 'react';
import { Colors, Shapes } from '../Types';
export declare type ButtonObject = {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    color?: Colors;
    /**
     * Select the shape of the component.
     *
     * @type 'rounded' | 'rounded-top' | 'rounded-end' | 'rounded-bottom' | 'rounded-start' | 'rounded-circle' | 'rounded-pill' | 'rounded-0' | 'rounded-1' | 'rounded-2' | 'rounded-3' | string
     */
    shape?: Shapes;
    /**
     * Size the component small or large.
     */
    size?: 'sm' | 'lg';
    /**
     * Set the button variant to an outlined button or a ghost button.
     */
    variant?: 'outline' | 'ghost';
};
export interface CFormCheckProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * Create button-like checkboxes and radio buttons.
     */
    button?: ButtonObject;
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Sets hit area to the full area of the component.
     */
    hitArea?: 'full';
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id?: string;
    /**
     * Input Checkbox indeterminate Property.
     */
    indeterminate?: boolean;
    /**
     * Group checkboxes or radios on the same horizontal row by adding.
     */
    inline?: boolean;
    /**
     * Set component validation state to invalid.
     */
    invalid?: boolean;
    /**
     * The element represents a caption for a component.
     */
    label?: string | ReactNode;
    /**
     * Specifies the type of component.
     */
    type?: 'checkbox' | 'radio';
    /**
     * Set component validation state to valid.
     */
    valid?: boolean;
}
export declare const CFormCheck: React.ForwardRefExoticComponent<CFormCheckProps & React.RefAttributes<HTMLInputElement>>;
