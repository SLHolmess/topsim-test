import styles from './Container.module.scss';
import ClassName from '../../models/classname';

const Container = (props: any) => {
    const { children, className } = props;
    const containerClassName = new ClassName(styles.container);

    containerClassName.addIf(className, className);

    return <div className={containerClassName.toString()}>{children}</div>;
};

export default Container;
