import "./globals.css";

export const metadata = {
  title: "Alpha Space",
  description: "Kenya-focused legal investment research platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
