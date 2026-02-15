import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-8xl font-extrabold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-bold text-navy-800 mb-4">Page Not Found</h2>
        <p className="text-navy-500 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">Go Back Home</Link>
      </div>
    </div>
  );
}
