import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AdminBitacoraPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Bitácora / Auditoría</h1>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Historial de Acciones</h2>
          <ul className="list-disc ml-6">
            <li>(sin datos)</li>
          </ul>
        </div>
      </main>
    </ProtectedRoute>
  );
}
