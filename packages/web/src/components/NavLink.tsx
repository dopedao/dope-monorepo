import React, { Children, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import Link, { LinkProps } from 'next/link';

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
  activeClassName?: string;
};

export const NavLink = ({ children, activeClassName = 'active', ...props }: NavLinkProps) => {
  const { pathname } = useRouter();
  const child = Children.only(children) as React.ReactElement;
  const childClassName = child.props.className || '';

  const isActive = pathname === props.href || pathname === props.as;
  const activePath = pathname === '' ? 'index' : pathname;

  const className = cx(childClassName, activePath, { [activeClassName]: isActive });

  const tabRef = useRef<HTMLDivElement>(null);

  // On mobile, scroll selected tab into view
  useEffect(() => {
    if (isActive && tabRef?.current) {
      tabRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'end',
      })
    }
  }, [isActive, tabRef]);

  return (
    <div ref={tabRef}>
      <Link {...props}>
        {React.cloneElement(child, {
          className: className || null
        })}
      </Link>
    </div>
  );
};
