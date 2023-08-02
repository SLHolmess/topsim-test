import styles from './Image.module.scss';

const Image = (props: any) => {
  const {
    children,
    className,
    width = '100%',
    height = 'auto',
    src,
    alt,
    srcSet,
    sizes,
    dangerouslySetInnerHTML,
  } = props;

  const imageClassName = className ? styles.image : styles[className];

  return (
    <figure className={imageClassName.toString()}>
      <div className={styles.featuredImageImg}>
        <img width={width} height={height} src={src} alt={alt || ''} srcSet={srcSet} sizes={sizes} />
      </div>
      {children && <figcaption>{children}</figcaption>}
      {dangerouslySetInnerHTML && (
        <figcaption
          dangerouslySetInnerHTML={{
            __html: dangerouslySetInnerHTML,
          }}
        />
      )}
    </figure>
  );
};

export default Image;
