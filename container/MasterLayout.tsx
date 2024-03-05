import Head from "#container/AppHead";

interface Props {
  children: JSX.Element | JSX.Element[];
}
const MasterLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head />
      {children}
    </>
  );
};

export default MasterLayout;
