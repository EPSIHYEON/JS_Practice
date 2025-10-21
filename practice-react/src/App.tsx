import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import NewPage from './pages/NewPage';
import WrittenPage from './pages/WrttenPage';
import UpdatePage from './pages/UpdatePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppLayout() {
  const location = useLocation();
  const hideLayout = ['/', '/loginpage', '/signuppage'].includes(location.pathname);
  return (
    <div className={hideLayout ? '' : 'min-h-screen bg-sky-200'}>
      {!hideLayout && (
        <nav className="flex items-center p-5">
          {/* 왼쪽 로고 */}
          <Link to="/home" className="text-3xl font-bold">
            GURUM
          </Link>

          {/* 오른쪽 메뉴 */}
          <div className="flex items-center gap-4 ml-auto text-[20px]">
            <Link to="/newpage">새글 추가</Link>
            <Link to="/mypage" className="text-gray-700">
              마이페이지
            </Link>
            {/* 프로필 아이콘 */}
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newpage" element={<NewPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/writtenpage/:id" element={<WrittenPage />} />
        <Route path="/updatepage/:id" element={<UpdatePage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signuppage" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App
