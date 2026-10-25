import React, { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const Link = forwardRef(function Link(
  { href, to: toProp, replace, scroll, shallow, passHref, prefetch, children, target, onClick, ...rest },
  ref
) {
  const rawTarget = href || toProp;
  let to = "/";

  if (typeof rawTarget === "string") {
    to = rawTarget;
  } else if (rawTarget && typeof rawTarget === "object") {
    to = (rawTarget.pathname || "") + (rawTarget.search || "") + (rawTarget.hash || "");
  }

  // Handle external links, mailto, tel, hash anchors, and target="_blank"
  const isExternal =
    to.startsWith("http://") ||
    to.startsWith("https://") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:") ||
    to.startsWith("#") ||
    target === "_blank";

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={to}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      ref={ref}
      to={to}
      replace={replace}
      target={target}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      {...rest}
    >
      {children}
    </RouterLink>
  );
});

export default Link;
