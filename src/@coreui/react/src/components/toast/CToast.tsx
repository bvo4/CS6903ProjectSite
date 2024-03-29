import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Colors, colorPropType } from '../Types'

export interface CToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Apply a CSS fade transition to the toast.
   */
  animation?: boolean
  /**
   * Auto hide the toast.
   */
  autohide?: boolean
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
  /**
   * Delay hiding the toast (ms).
   */
  delay?: number
  /**
   * @ignore
   */
  index?: number
  /**
   * @ignore
   */
  key?: number
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: (index: number | null) => void
  /**
   * Callback fired when the component requests to be shown.
   */
  onShow?: (index: number | null) => void
  /**
   * Toggle the visibility of component.
   */
  visible?: boolean
}

interface ContextProps extends CToastProps {
  visible?: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export const CToastContext = createContext({} as ContextProps)

export const CToast = forwardRef<HTMLDivElement, CToastProps>(
  (
    {
      children,
      animation = true,
      autohide = true,
      className,
      color,
      delay = 5000,
      index,
      key,
      visible = false,
      onClose,
      onShow,
      ...rest
    },
    ref,
  ) => {
    const [_visible, setVisible] = useState(false)
    const timeout = useRef<number>()

    useEffect(() => {
      setVisible(visible)
    }, [visible])

    const contextValues = {
      visible: _visible,
      setVisible,
    }

    // triggered on mount and destroy
    useEffect(() => () => clearTimeout(timeout.current), [])

    useEffect(() => {
      _autohide()
    }, [_visible])

    const _autohide = () => {
      if (autohide) {
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          setVisible(false)
        }, delay)
      }
    }

    const _className = classNames(
      'toast',
      {
        fade: animation,
        [`bg-${color}`]: color,
        'border-0': color,
      },
      className,
    )

    const getTransitionClass = (state: string) => {
      return state === 'entering'
        ? 'showing'
        : state === 'entered'
        ? 'show'
        : state === 'exiting'
        ? 'showing'
        : 'fade'
    }

    return (
      <Transition
        in={_visible}
        onEnter={() => onShow && onShow(index ? index : null)}
        onExited={() => onClose && onClose(index ? index : null)}
        timeout={250}
        unmountOnExit
      >
        {(state) => {
          const transitionClass = getTransitionClass(state)
          return (
            <CToastContext.Provider value={contextValues}>
              <div
                className={classNames(_className, transitionClass)}
                aria-live="assertive"
                aria-atomic="true"
                role="alert"
                onMouseEnter={() => clearTimeout(timeout.current)}
                onMouseLeave={() => _autohide}
                {...rest}
                key={key}
                ref={ref}
              >
                {children}
              </div>
            </CToastContext.Provider>
          )
        }}
      </Transition>
    )
  },
)

CToast.propTypes = {
  animation: PropTypes.bool,
  autohide: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  delay: PropTypes.number,
  index: PropTypes.number,
  key: PropTypes.number,
  onClose: PropTypes.func,
  onShow: PropTypes.func,
  visible: PropTypes.bool,
}

CToast.displayName = 'CToast'
