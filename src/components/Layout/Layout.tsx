import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        {/* 배경 원 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%-80px)] w-[300px] h-[300px] bg-brand-500/50 rounded-full blur-[200px]" />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
