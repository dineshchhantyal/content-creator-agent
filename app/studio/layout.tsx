export const metadata = {
  title: "Creator Studio - Coming Soon",
  description:
    "Your all-in-one workspace for creating, editing, and publishing content powered by AI.",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="studio-layout">{children}</div>;
}
