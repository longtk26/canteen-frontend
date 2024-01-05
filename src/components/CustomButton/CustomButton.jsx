import PropTypes from 'prop-types';
import classNames from 'classnames';

const CustomButton = ({
    title,
    variant = 'primary',
    onAction,
    disabled = false,
    className: customClass 
}) => {
    const primaryButtonClass = 'bg-primary border-0 border-primary rounded shadow-lg shadow-brown text-white hover:bg-primary/70';
    const secondaryButtonClass = 'bg-secondary border-0 border-secondary rounded text-black hover:bg-secondary/70';
    const tertiaryButtonClass = 'bg-tertiary border-0 border-tertiary rounded text-white hover:bg-tertiary/70';
    const dangerButtonClass = 'bg-red-700 border-0 border-red-700 rounded text-white hover:bg-red-700/70'
    const deleteButtonClass = 'bg-transparent border-primary border-2 rounded text-primary hover:bg-primary hover:text-white';

    let classes =''
    if (variant === 'primary'){
      classes = classNames('button', primaryButtonClass, customClass); 
    }
    else if (variant === 'secondary'){
      classes = classNames('button', secondaryButtonClass, customClass); 
    }
    else if (variant === 'tertiary'){
      classes = classNames('button', tertiaryButtonClass, customClass); 
    }
    else if (variant === 'danger'){
      classes = classNames('button', dangerButtonClass, customClass);
    }
    else if (variant == 'delete'){
      classes = classNames('button', deleteButtonClass, customClass);
    }
    else{
      classes = classNames('button', customClass);
    }
    const onActionFunc = (e) => {
      e.preventDefault();
      onAction.call();
    };

    return (
      <button
        type="button"
        onClick={(e) => {
          onActionFunc(e);
        }}
        className={classes}
        disabled={disabled}
      >
        <span>{title}</span>
      </button>
    );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onAction: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default CustomButton;
