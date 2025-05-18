
import { Hand } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="py-6 border-t dark:border-gray-800 mt-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Hand size={24} className="text-signify-purple" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-signify">
              SignifyX
            </span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            Developed by Pranav Jasyal, Rohit Thakur, Raghav Thakur, Rizul Thakur
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SignifyX. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
