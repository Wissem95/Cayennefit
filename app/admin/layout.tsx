

export const metadata = {
    title: "CAYENNEFIT - Administration",
    description: "Panel d'administration CAYENNEFIT",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pb-0">
                {children}
            </main>
        </div>
    );
} 