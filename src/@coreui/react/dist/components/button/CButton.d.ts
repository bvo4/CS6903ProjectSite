import React, { ButtonHTMLAttributes, ElementType } from 'react';
import { Colors, Shapes } from '../Types';
export interface CButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Toggle the active state for the component.
     */
    active?: boolean;
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    color?: Colors;
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component?: string | ElementType;
    /**
     * Toggle the disabled state for the component.
     */
    disabled?: boolean;
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href?: string;
    /**
     * The role attribute describes the role of an element in programs that can make use of it, such as screen readers or magnifiers.
     */
    role?: string;
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
     * Specifies the type of button. Always specify the type attribute for the `<button>` element.
     * Different browsers may use different default types for the `<button>` element.
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * Set the button variant to an outlined button or a ghost button.
     */
    variant?: 'outline' | 'ghost';
}
export declare const CButton: React.ForwardRefExoticComponent<CButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
