import styles from "./Breadcrumbs.module.scss"
import ClassName from '../../models/classname';

const BreadCrumbs = (props: any) => {
  const { className, breadcrumbs } = props;
  const breadcrumbsClassName = new ClassName(styles.breadcrumbs);

  breadcrumbsClassName.addIf(className, className);
  return (
    <ul className={breadcrumbsClassName.toString()}>
      {breadcrumbs.map(({ id, title, uri }: Record<string, any>) => {
        return (
          <li key={id}>
            {!uri && title}
            {uri && (
              <a href={uri}>
                <a>{title}</a>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
  }
  
  export default BreadCrumbs