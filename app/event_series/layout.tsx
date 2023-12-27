export default function Layout(props: {
  children: React.ReactNode;
  create: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.create}
    </>
  );
}
