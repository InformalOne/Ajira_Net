import { createElement } from 'react';
import classNames from 'clsx';

type Props = React.LabelHTMLAttributes<unknown> & {
  as?: string;
};

const Label: React.FCC<Props> = ({ children, className, as, ...props }) => {
  const tag = as ?? `label`;

  return createElement(
    tag,
    {
      className: classNames(
        `w-full font-medium [&>*]:mt-[0.35rem]`,
        className
      ),
      ...props,
    },
    children
  );
};

export default Label;
