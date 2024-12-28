import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - User Not Found</h1>
      <p className="text-xl mb-4">Sorry, we could not find the user you are looking for.</p>
      <Link href="/admin/users">
        <a className="text-blue-500 hover:underline">Return to User List</a>
      </Link>
    </div>
  );
}
