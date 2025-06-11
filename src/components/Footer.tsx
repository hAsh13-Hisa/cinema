const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">
            © 2025 映画なにみる？ Data provided by{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              The Movie Database (TMDb)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;