type HeadingType = 1 | 2 | 3 | 4 | 5 | 6;

const Heading: React.FCC<{ type?: HeadingType }> = ({ type, children }) => {
  switch (type) {
    case 1:
      return (
        <h1
          className={`font-heading scroll-m-20 text-4xl font-semibold tracking-tight text-grey-800`}
        >
          {children}
        </h1>
      );
    case 2:
      return (
        <h2
          className={`font-heading scroll-m-20 pb-2 text-3xl font-medium' +
            ' tracking-tight transition-colors first:mt-0`}
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          className={
            'font-heading scroll-m-20 text-2xl font-medium tracking-tight'
          }
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4
          className={
            'font-heading scroll-m-20 text-xl font-medium tracking-tight'
          }
        >
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={'scroll-m-20 font-heading text-lg font-medium'}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 className={'scroll-m-20 font-heading text-base font-medium'}>
          {children}
        </h6>
      );

    default:
      return <Heading type={1}>{children}</Heading>;
  }
};

export default Heading;
