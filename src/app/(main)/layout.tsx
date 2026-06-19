import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <Header />
      <main className="flex-1 pt-20 w-full">{children}</main>
      <Footer />
    </div>
  );
}
