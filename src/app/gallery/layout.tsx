import '@/app/shared/styles/variables.css'
import '@/app/shared/styles/global.css'

import styles from './page.module.css'
import mixinStyles from '@/app/shared/styles/mixin.module.css'

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div className={`${styles.container} ${mixinStyles.rounded} ${mixinStyles.shadow}`}>
            {children}
        </div>
    )
}