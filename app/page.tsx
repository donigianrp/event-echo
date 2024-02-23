import Feed from './components/feed';

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center p-2">
        Event Echo - Home of Your Voice
      </div>
      <Feed />
    </>
  );
}
