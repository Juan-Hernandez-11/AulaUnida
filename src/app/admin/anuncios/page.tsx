import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AdminAnunciosPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Gestión de Anuncios Generales</h1>
        <div className="bg-white rounded shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">Crear/Editar Anuncio</h2>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="border p-2 rounded" placeholder="Título del anuncio" disabled />
            <textarea className="border p-2 rounded col-span-1 md:col-span-3" placeholder="Contenido" disabled />
            <button className="col-span-1 md:col-span-3 bg-blue-500 text-white rounded p-2 mt-2" disabled>Publicar</button>
          </form>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Listado de Anuncios</h2>
          <table className="w-full text-left border">
            <thead>
              <tr>
                <th className="border-b p-2">Título</th>
                <th className="border-b p-2">Fecha</th>
                <th className="border-b p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2">(sin datos)</td>
                <td className="border-b p-2">(sin datos)</td>
                <td className="border-b p-2">(sin datos)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </ProtectedRoute>
  );
}
