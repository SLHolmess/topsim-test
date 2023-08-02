import styles from './Button.module.scss';

const Button = (props: any) => {
    // ...rest ??
    let { children, className, ...rest } = props;

    let buttonClassName = styles.button;

    if (className) {
        buttonClassName = `${buttonClassName} ${className}`;
    }

    // {...rest}
    return (
        <button className={buttonClassName}>
            {children}
        </button>
    );
};

export default Button;
