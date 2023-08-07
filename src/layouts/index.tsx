/*
 * @Author: 倪航天
 * @Date: 2023-07-30 00:01:34
 * @LastEditTime: 2023-08-06 16:00:24
 * @LastEditors: 倪航天
 * @Description: 
 */
import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/renderForm">renderForm</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
