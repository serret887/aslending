import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Welcome to Your App</h1>
        <p className="text-lg mb-4">This is your new Next.js application with:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Tailwind CSS for styling</li>
          <li>Inter font for typography</li>
          <li>Dark mode support</li>
          <li>Responsive design</li>
        </ul>
      </div>
    </main>
  );
}
