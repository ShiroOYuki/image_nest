import '@/app/shared/styles/variables.css'
import '@/app/shared/styles/global.css'

import './page.css'
import styles from './page.module.css'
import mixinStyles from './shared/styles/mixin.module.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={`${styles.container} ${mixinStyles.rounded} ${mixinStyles.shadow}`}>
          {children}
        </div>
      </body>
    </html>
  )
}