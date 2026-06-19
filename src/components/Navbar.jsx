import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>📵</span>
          <span className={styles.logoText}>스크린타임 충격</span>
        </NavLink>
        <div className={styles.links}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            시각화
          </NavLink>
          <NavLink
            to="/checklist"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            디톡스 체크
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            후기
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
