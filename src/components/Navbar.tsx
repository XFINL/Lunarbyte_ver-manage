import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = isAuthenticated ? (
    currentUser?.role === 'admin' ? (
      <>
        <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
          <i className="iconfont icon-dashboard"></i>
          <span>控制台</span>
        </Link>
      </>
    ) : (
      <>
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
          <i className="iconfont icon-apps"></i>
          <span>我的应用</span>
        </Link>
      </>
    )
  ) : (
    <>
      <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
        <i className="iconfont icon-home"></i>
        <span>首页</span>
      </Link>
    </>
  );

  const navContent = (
    <>
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <i className="iconfont icon-hotupdate text-2xl"></i>
        <span>HotUpdate</span>
      </Link>

      <nav className="flex items-center gap-2">
        {navLinks}
      </nav>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-600 hidden md:inline">
              {currentUser?.username}
            </span>
            <button onClick={handleLogout} className="btn-secondary text-sm px-4 py-2">
              退出
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-primary text-sm px-4 py-2">
            登录
          </Link>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-nav safe-area-bottom">
        <div className="flex items-center justify-around py-3 px-4">
          {navContent}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 glass-nav rounded-2xl">
      <div className="flex items-center justify-between py-4 px-6">
        {navContent}
      </div>
    </div>
  );
}
