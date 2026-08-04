import "./globals.css";

export const metadata = {
  title: "Prints",
  description: "Fine art print shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
