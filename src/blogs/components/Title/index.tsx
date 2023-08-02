import ClassName from '../../models/classname';

import styles from './Title.module.scss';

const Title = (props: any) => {
    const { className, title, thumbnail } = props;
    const titleClassName = new ClassName(styles.title);

    titleClassName.addIf(className, className);

    return (
        <div className={titleClassName.toString()}>
            {thumbnail && <img src={thumbnail.url} alt="" aria-hidden="true" />}
            <span>{title}</span>
        </div>
    );
};

export default Title;
