import React from 'react';
import CTAButton from '../components/CTAButton';
import { PageMeta } from '../components/PageMeta';
import { SEO_META } from '../constants/seoMeta';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <main className="min-h-screen w-full bg-cream flex flex-col items-center justify-center p-6 text-center">
      <PageMeta
        title={SEO_META.notFound.title}
        description={SEO_META.notFound.description}
        robots="noindex"
      />
      
      {/* Simple, clear heading */}
      <h1 className="font-serif text-5xl md:text-6xl text-dark mb-4">
        Page Not Found
      </h1>
      
      {/* Plain explanation */}
      <p className="font-sans text-lg text-dark/70 max-w-md mb-8 leading-relaxed">
        The page you are looking for does not exist. It might have been moved, deleted, or you may have typed the address incorrectly.
      </p>

      {/* Action button using your existing component */}
      <CTAButton 
        variant="solid" 
        theme="light" 
        onClick={() => onNavigate('homepage')}
      >
        Go Back Home
      </CTAButton>

    </main>
  );
};

export default NotFoundPage;
