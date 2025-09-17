import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div>
        <h1>Dashboard del Administrador</h1>
        <p>Solo visible para usuarios autenticados con rol de administrador.</p>
      </div>
    </ProtectedRoute>
  );
}
