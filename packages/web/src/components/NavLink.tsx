import React, { Children } from 'react';
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

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};
