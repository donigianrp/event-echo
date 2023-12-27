export default function Layout(props: {
  children: React.ReactNode;
  edit: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.edit}
    </>
  );
}
