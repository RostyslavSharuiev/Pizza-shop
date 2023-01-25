import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="266" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="313" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="430" rx="10" ry="10" width="111" height="30" />
    <rect x="120" y="420" rx="20" ry="20" width="160" height="45" />
  </ContentLoader>
);

export default Skeleton;
