// import ClassName from 'models/classname';
// import styles from './NavListItem.module.scss';
// import Link from 'next/link';

const NavListItem = (props: any) => {
  const { className, item } = props;
  const nestedItems = (item.children || []).map((item: any) => {
    return <NavListItem key={item.id} item={item} />;
  });

  return (
    <li key={item.id}>
      {!item.path.includes('http') && !item.target && (
        <a href={item.path}>
          <a title={item.title}>{item.label}</a>
        </a>
      )}
      {item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target}>
          {item.label}
        </a>
      )}

      {nestedItems.length > 0 && <ul className={className}>{nestedItems}</ul>}
    </li>
  );
};

export default NavListItem;
