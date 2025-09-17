import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AdminConfiguracionPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Configuración General</h1>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Opciones de Configuración</h2>
          <ul className="list-disc ml-6">
            <li>(sin datos)</li>
          </ul>
        </div>
      </main>
    </ProtectedRoute>
  );
}
