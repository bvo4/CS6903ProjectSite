import React, { forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import { Colors, colorPropType } from '../Types'
import { CCloseButton } from '../close-button/CCloseButton'

export interface CAlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color: Colors
  /**
   * Optionally add a close button to alert and allow it to self dismiss.
   */
  dismissible?: boolean
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void
  /**
   * Set the alert variant to a solid.
   */
  variant?: 'solid' | string
  /**
   * Toggle the visibility of component.
   */
  visible?: boolean
}

export const CAlert = forwardRef<HTMLDivElement, CAlertProps>(
  (
    {
      children,
      className,
      color = 'primary',
      dismissible,
      variant,
      visible = true,
      onClose,
      ...rest
    },
    ref,
  ) => {
    const [_visible, setVisible] = useState(visible)

    useEffect(() => {
      setVisible(visible)
    }, [visible])

    const _className = classNames(
      'alert',
      variant === 'solid' ? `bg-${color} text-white` : `alert-${color}`,
      {
        'alert-dismissible fade': dismissible,
      },
      className,
    )

    const getTransitionClass = (state: string) => {
      return state === 'entered' && 'show'
    }

    return (
      <Transition in={_visible} mountOnEnter onExit={onClose} timeout={150} unmountOnExit>
        {(state) => {
          const transitionClass = getTransitionClass(state)
          return (
            <div
              className={classNames(_className, transitionClass)}
              role="alert"
              {...rest}
              ref={ref}
            >
              {children}
              {dismissible && <CCloseButton onClick={() => setVisible(false)} />}
            </div>
          )
        }}
      </Transition>
    )
  },
)

CAlert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType.isRequired,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  variant: PropTypes.string,
  visible: PropTypes.bool,
}

CAlert.displayName = 'CAlert'
