import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './SideMenu.module.scss';

export default function SideMenu() {
    const router = useRouter()
    return (
        <div className={styles.side_menu_wrap}>
            <ul>
                <li className={router.pathname === "/users" ? styles.on: ''}>
                    <Link href="/users">
                        회원목록
                    </Link>
                </li>
                <li className={router.pathname === "/register" ? styles.on: ''}>
                    <Link href="/register">
                        상품등록
                    </Link>
                </li>
                <li className={router.pathname === "/shoplist" ? styles.on: ''}>
                    <Link href="/shoplist">
                        상품목록
                    </Link>
                </li>
            </ul>
        </div>
    )
}
