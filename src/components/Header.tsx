
import { useNavigate } from 'react-router-dom';
import { Hand, Sun, Moon, Menu, X, LogOut, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getInitials = () => {
    if (!user) return '?';
    const username = user.user_metadata.username || '';
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <header className="py-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <Hand size={28} className="text-signify-purple" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-signify">
            SignifyX
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {user && (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="hover:text-signify-purple transition-colors"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/detection')}
                className="hover:text-signify-purple transition-colors"
              >
                Detection
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/learn')}
                className="hover:text-signify-purple transition-colors"
              >
                Learn
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/practice')}
                className="hover:text-signify-purple transition-colors"
              >
                Practice
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/profile')}
                className="hover:text-signify-purple transition-colors"
              >
                Profile
              </Button>
            </>
          )}
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Avatar onClick={() => navigate('/profile')} className="cursor-pointer">
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate('/auth')}
              className="flex items-center gap-1"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </Button>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="container mt-4 pb-4 lg:hidden">
          <div className="flex flex-col space-y-3">
            {user ? (
              <>
                <div className="flex items-center space-x-3 py-2">
                  <Avatar>
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.user_metadata.username || 'User'}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => {
                    navigate('/detection');
                    setMobileMenuOpen(false);
                  }}
                >
                  Detection
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => {
                    navigate('/learn');
                    setMobileMenuOpen(false);
                  }}
                >
                  Learn
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => {
                    navigate('/practice');
                    setMobileMenuOpen(false);
                  }}
                >
                  Practice
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                >
                  Profile
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2" size={16} />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  navigate('/auth');
                  setMobileMenuOpen(false);
                }}
              >
                <LogIn className="mr-2" size={16} />
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
