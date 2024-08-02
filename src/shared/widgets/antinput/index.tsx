import "./input.scss";

import { Input } from "antd";
import PropTypes from "prop-types";

function AntInput(props: any) {
  let {
    className,
    name,
    disabled,
    value,
    readonly,
    onBlur,
    placeHolder,
    maxLength,
    onChange,
    type,
    onFocus,
    id,
    showCount,
    defaultValue,
    onKeyDown,
    onClick,
    autoFocus,
    status,
    ...restProps
  } = props;

  

  return (
    <Input
      allowClear
      name={name}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      placeholder={placeHolder}
      className={className}
      value={value}
      type={type}
      onFocus={onFocus}
      id={id}
      status={status}
      maxLength={maxLength}
      showCount={showCount}
      defaultValue={defaultValue}
      disabled={disabled}
      onClick={onClick}
      autoFocus={autoFocus}
      {...restProps}
    />
  );
}

export { AntInput };

AntInput.defaultProps = {
  className: "",
  disabled: false,
};

AntInput.propTypes = {
  className: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.any,
  onBlur: PropTypes.any,
  defaultValue: PropTypes.any,
  placeHolder: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.any,
  type: PropTypes.any,
  onFocus: PropTypes.any,
  maxLength: PropTypes.any,
  showCount: PropTypes.any,
  readonly: PropTypes.string,
  focus: PropTypes.any,
  onKeyDown: PropTypes.any,
  id: PropTypes.string,
  autoFocus: PropTypes.any,
  status: PropTypes.any,
};
