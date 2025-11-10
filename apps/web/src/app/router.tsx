import { useState, useEffect } from "react";

interface Route {
  path: string;
  component: React.ReactElement;
}

interface RouterProps {
  routes: Route[];
  defaultPath?: string;
}

type LinkProps = Readonly<{
  to: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}>;

export const Router = ({ routes, defaultPath = "/" }: RouterProps) => {
  const [currentPath, setCurrentPath] = useState(globalThis.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(globalThis.location.pathname);
    };

    globalThis.addEventListener("popstate", handlePopState);
    return () => globalThis.removeEventListener("popstate", handlePopState);
  }, []);

  const route = routes.find((r) => r.path === currentPath) || routes.find((r) => r.path === defaultPath);

  return route ? route.component : <div>404 - Not Found</div>;
};

export function navigate(path: string) {
  globalThis.history.pushState({}, "", path);
  globalThis.dispatchEvent(new PopStateEvent("popstate"));
}

export const Link: React.FC<LinkProps> = ({ to, children, style, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};
