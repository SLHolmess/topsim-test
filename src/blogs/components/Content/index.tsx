import styles from './Content.module.scss';
import ClassName from '../../models/classname';

const Content = (props: any) => {
    const { children, className } = props;
    const contentClassName = new ClassName(styles.content);

    contentClassName.addIf(className, className);
  
    return <div className={contentClassName.toString()}>{children}</div>;
  };
  
  export default Content;
  