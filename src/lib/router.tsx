'use client';

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';

// --- 1. CONFIGURATION ---

// Define strictly where the "UI Back Button" should go.
const ROUTE_HIERARCHY: Record<string, string> = {
  '/services/video-editing': '/',
  '/services/web-dev': '/',
  '/services/ai-agents': '/',
  '/about': '/',
  '/process': '/',
  '/careers': '/',
  '/contact': '/',
  // Children go back to their service page
  '/services/video-editing/cat-shorts': '/services/video-editing',
  '/services/video-editing/cat-corporate': '/services/video-editing',
  '/services/video-editing/cat-social': '/services/video-editing',
};

// Calculate how "deep" a page is in the structure
function getPageDepth(path: string): number {
  const cleanPath = path.replace('#', '');
  if (cleanPath === '/' || cleanPath === '') return 0; // Home is Level 0
  
  // Count the slashes to determine depth
  // e.g. /services/web-dev = 2 slashes (Level 1 usually, but let's count segments)
  const segments = cleanPath.split('/').filter(Boolean);
  
  // Specific Adjustment for your site structure:
  // Level 1: Main Pages & Services (/about, /services/web-dev)
  // Level 2: Detail Pages (/services/video-editing/shorts)
  
  if (segments.length === 1) return 1; // e.g. /about, /careers
  if (segments[0] === 'services' && segments.length === 2) return 1; // e.g. /services/web-dev (Treat as Level 1)
  
  return segments.length; // Level 2+
}

function getLogicalParent(currentPath: string): string {
  const path = currentPath.replace('#', '');
  if (ROUTE_HIERARCHY[path]) return ROUTE_HIERARCHY[path];
  if (path.includes('/services/video-editing/')) return '/services/video-editing';
  if (path.includes('/services/')) return '/';
  return '/';
}

// --- 2. ROUTER CONTEXT ---
interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  goBack: () => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  goBack: () => {},
  params: {}
});

export function useRouter() {
  return useContext(RouterContext);
}

export function useParams() {
  return useContext(RouterContext).params;
}

// --- 3. ROUTER PROVIDER ---
interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.slice(1) || '/';
    }
    return '/';
  });

  const [params, setParams] = useState<Record<string, string>>({});
  const isRedirecting = useRef(false);

  const handleHashChange = () => {
    if (isRedirecting.current) {
      isRedirecting.current = false;
      return;
    }

    const newPath = window.location.hash.slice(1) || '/';
    setPath(newPath);

    // Params Extraction
    const videoMatch = newPath.match(/^\/services\/video-editing\/([^/]+)$/);
    const serviceMatch = newPath.match(/^\/services\/([^/]+)$/);

    if (videoMatch) setParams({ categoryId: videoMatch[1] });
    else if (serviceMatch) setParams({ slug: serviceMatch[1] });
    else setParams({});
  };

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // --- SMART NAVIGATION (THE FIX) ---
  const navigate = (to: string) => {
    const currentDepth = getPageDepth(path);
    const nextDepth = getPageDepth(to);

    // CORE LOGIC:
    // If we are moving SIDEWAYS (Level 1 -> Level 1), use REPLACE.
    // This stops "Service Hopping" from cluttering the browser history.
    if (currentDepth === nextDepth && currentDepth > 0) {
      window.history.replaceState(null, '', `#${to}`);
      // Manually trigger update since replaceState doesn't fire hashchange
      setPath(to);
      const serviceMatch = to.match(/^\/services\/([^/]+)$/);
      if (serviceMatch) setParams({ slug: serviceMatch[1] });
      else setParams({});
    } 
    // If going DEEPER (Home -> Service) or UP (Service -> Home), use Standard Push
    else {
      window.location.hash = to;
    }
  };

  // Logical Back (UI Button)
  const goBack = () => {
    const parent = getLogicalParent(path);
    isRedirecting.current = true;
    window.history.replaceState(null, '', `#${parent}`);
    setPath(parent);
    handleHashChange();
  };

  return (
    <RouterContext.Provider value={{ path, navigate, goBack, params }}>
      {children}
    </RouterContext.Provider>
  );
}

// --- 4. ROUTES COMPONENT ---
interface RouteProps {
  path: string;
  component: React.ComponentType;
}

interface RoutesProps {
  children: ReactNode;
}

export function Routes({ children }: RoutesProps) {
  const { path } = useRouter();
  const routes = (Array.isArray(children) ? children : [children]) as React.ReactElement<RouteProps>[];

  for (const route of routes) {
    if (!route?.props) continue;
    const routePath = route.props.path;

    if (routePath === path) {
      const Component = route.props.component;
      return <Component />;
    }

    if (routePath.includes(':')) {
      const regexPath = routePath.replace(/:[^\s/]+/g, '([^/]+)');
      const match = path.match(new RegExp(`^${regexPath}$`));
      if (match) {
        const Component = route.props.component;
        return <Component />;
      }
    }
  }

  const firstRoute = routes[0];
  if (firstRoute?.props?.component) {
    const Component = firstRoute.props.component;
    return <Component />;
  }
  
  return null;
}

export function Route({ path: _path, component: _component }: RouteProps) {
  return null;
}

// --- 5. LINK COMPONENT ---
interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Link({ to, children, className, onClick }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();

    if (to.startsWith('#') && !to.startsWith('#/')) {
      if (window.location.hash !== '' && window.location.hash !== '#/' && window.location.hash !== '#') {
         navigate('/');
         setTimeout(() => {
            const element = document.getElementById(to.replace('#', ''));
            if (element) element.scrollIntoView({ behavior: 'smooth' });
         }, 100);
      } else {
         const element = document.getElementById(to.replace('#', ''));
         if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    navigate(to);
    
    if (to.startsWith('/') || to.startsWith('#/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <a href={`#${to}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}