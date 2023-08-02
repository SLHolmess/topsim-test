// import a from 'next/a';

import { categoryPathBySlug } from '../../lib/categories';
import { authorPathByName } from '../../lib/users';
import { formatDate } from '../../lib/datetime';
import ClassName from '../../models/classname';

// import { FaMapPin } from 'react-icons/fa/index.js';
import styles from './Metadata.module.scss';

const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
};

const Metadata = (props: any) => {
    const { className, author, date, categories, options = DEFAULT_METADATA_OPTIONS, isSticky = false } = props;
  const metadataClassName = new ClassName(styles.metadata);

  metadataClassName.addIf(className, className);

  const { compactCategories } = options;

  return (
    <ul className={metadataClassName.toString()}>
      {author && (
        <li className={styles.metadataAuthor}>
          <address>
            {author.avatar && (
              <img
                width={author.avatar.width}
                height={author.avatar.height}
                src={author.avatar.url}
                alt="Author Avatar"
              />
            )}
            By{' '}
            <a href={authorPathByName(author.name)} rel="author">
              {author.name}
            </a>
          </address>
        </li>
      )}
      {date && (
        <li>
          <time dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      )}
      {Array.isArray(categories) && categories[0] && (
        <li className={styles.metadataCategories}>
          {compactCategories && (
            <p title={categories.map(({ name }) => name).join(', ')}>
              <a href={categoryPathBySlug(categories[0].slug)}>
                {categories[0].name}
              </a>
              {categories.length > 1 && ' and more'}
            </p>
          )}
          {!compactCategories && (
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <a href={categoryPathBySlug(category.slug)}>
                      {category.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      )}
      {isSticky && (
        <li className={styles.metadataSticky}>
          {/* <FaMapPin aria-label="Sticky Post" /> */}
        </li>
      )}
    </ul>
  );
};

export default Metadata;
