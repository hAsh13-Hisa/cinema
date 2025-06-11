import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="text-white">
      <div className="container mx-auto px-4">
        <div className="py-4" style={{backgroundColor: '#fde8ac'}}>
          <Link to="/" className="block hover:opacity-80 transition-opacity">
            <img 
              src="/abg_cinema.png" 
              alt="映画なにみる？" 
              className=""
              style={{height: '120px', width: 'auto', maxWidth: '400px'}}
            />
          </Link>
        </div>
        <div className="pt-8 pb-6">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="映画を検索..."
                  className="flex-1 bg-white text-gray-900 focus:outline-none placeholder-gray-400"
                  style={{
                    paddingTop: '24px',
                    paddingBottom: '24px', 
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    fontSize: '20px'
                  }}
                />
                <button
                  type="submit"
                  className="bg-black text-white font-medium"
                  style={{
                    paddingLeft: '48px',
                    paddingRight: '48px',
                    paddingTop: '24px',
                    paddingBottom: '24px',
                    fontSize: '20px'
                  }}
                >
                  SEARCH
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-4 space-x-6 text-gray-600 text-sm">
              <Link 
                to="/now-playing" 
                className="flex items-center space-x-1 cursor-pointer"
              >
                <span>🎬</span>
                <span>上映中</span>
              </Link>
              <Link 
                to="/search?genre=18" 
                className="flex items-center space-x-1 cursor-pointer"
              >
                <span>🎭</span>
                <span>ドラマ</span>
              </Link>
              <Link 
                to="/search?genre=28" 
                className="flex items-center space-x-1 cursor-pointer"
              >
                <span>💥</span>
                <span>アクション</span>
              </Link>
              <Link 
                to="/search?genre=35" 
                className="flex items-center space-x-1 cursor-pointer"
              >
                <span>😂</span>
                <span>コメディ</span>
              </Link>
              <Link 
                to="/search?genre=27" 
                className="flex items-center space-x-1 cursor-pointer"
              >
                <span>👻</span>
                <span>ホラー</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;