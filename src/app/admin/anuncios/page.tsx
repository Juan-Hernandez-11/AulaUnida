'use client';
import { useAuth } from '@/context/authContext';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusIcon, TrashIcon, UserCircleIcon, AcademicCapIcon, ClipboardIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import NextLink from '@/components/NextLink';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingModal from '@/components/ui/LoadingModal';
import useDelayedOpen from '@/hooks/useDelayedOpen';
import styles from '@/styles/admin-dashboard.module.css';

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Promoción', icon: UserGroupIcon, href: '/admin/promocion' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

interface Anuncio {
  id: number;
  mensaje: string;
  tipo: string;
  autorId: number;
  autor: { name: string; email: string };
  fecha: string;
}

export default function AdminAnunciosPage() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ mensaje: '', tipo: 'global' });
  const delayedOpen = useDelayedOpen(loading);

  useEffect(() => {
    if (!user) return;
    loadAnuncios();
  }, [user]);

  const loadAnuncios = async () => {
    try {
      setLoading(true);
      const idToken = await user?.getIdToken();
      const response = await fetch('/api/admin/anuncios', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        // El endpoint devuelve { anuncios: [...] }
        setAnuncios(data.anuncios || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mensaje.trim()) {
      setError('El mensaje es requerido');
      return;
    }

    try {
      const idToken = await user?.getIdToken();
      const response = await fetch('/api/admin/anuncios', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ mensaje: '', tipo: 'global' });
        setShowForm(false);
        setError('');
        setSuccess('Anuncio creado ✓');
        setTimeout(() => setSuccess(''), 3000);
        loadAnuncios();
      } else {
        setError('Error al crear anuncio');
      }
    } catch (err) {
      setError('Error al crear anuncio');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar?')) return;
    try {
      const idToken = await user?.getIdToken();
      await fetch(`/api/admin/anuncios?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      setSuccess('Anuncio eliminado ✓');
      setTimeout(() => setSuccess(''), 3000);
      loadAnuncios();
    } catch (err) {
      setError('Error al eliminar');
    }
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <img src="/favicon.ico" alt="Admin" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
          <nav className={styles.menu}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarLinks.map(link => (
                <li key={link.label}>
                  <NextLink href={link.href} className={`${styles.menuItem} ${pathname === link.href ? styles.menuItemActive : ''}`}>
                    <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className={styles.mainContent}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 className={styles.title}>Gestión de Anuncios</h1>
            <button
              onClick={() => { setFormData({ mensaje: '', tipo: 'global' }); setShowForm(!showForm); setError(''); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white',
                border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500,
              }}
            >
              <PlusIcon style={{ width: 20, height: 20 }} />
              Nuevo Anuncio
            </button>
          </div>

          {error && <div style={{ color: '#dc2626', marginBottom: '1rem', padding: '0.75rem 1rem', backgroundColor: '#fee2e2', borderRadius: '0.5rem', borderLeft: '4px solid #dc2626' }}>{error}</div>}
          {success && <div style={{ color: '#10b981', marginBottom: '1rem', padding: '0.75rem 1rem', backgroundColor: '#ecfdf5', borderRadius: '0.5rem', borderLeft: '4px solid #10b981' }}>{success}</div>}

          {showForm && (
            <div className={styles.activityCard} style={{ marginBottom: '2rem' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>Mensaje *</label>
                  <textarea
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Escribe el anuncio aquí..."
                    style={{
                      width: '100%', minHeight: '100px', padding: '0.75rem',
                      border: '1px solid #333', borderRadius: '0.375rem',
                      backgroundColor: '#1B1B1B', color: '#fff', fontSize: '0.95rem', fontFamily: 'inherit',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>Tipo</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    style={{
                      padding: '0.75rem', border: '1px solid #333', borderRadius: '0.375rem',
                      backgroundColor: '#1B1B1B', color: '#fff', fontSize: '0.95rem',
                    }}
                  >
                    <option value="global">Global</option>
                    <option value="importante">Importante</option>
                    <option value="evento">Evento</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 500 }}>Guardar</button>
                  <button type="button" onClick={() => { setShowForm(false); setError(''); }} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#6B7280', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>Cancelar</button>
                </div>
              </form>
            </div>
          )}

          <LoadingModal open={delayedOpen} message="Cargando..." />

          {!loading && anuncios.length === 0 && <div className={styles.activityCard} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>No hay anuncios</div>}

          {!loading && anuncios.length > 0 && (
            <div className={styles.activityCard}>
              <table className={styles.activityTable}>
                <thead>
                  <tr>
                    <th>Mensaje</th>
                    <th>Tipo</th>
                    <th>Autor</th>
                    <th>Fecha</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {anuncios.map(a => (
                    <tr key={a.id}>
                      <td style={{ maxWidth: '300px' }}>{a.mensaje}</td>
                      <td><span style={{ padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.85rem', backgroundColor: a.tipo === 'importante' ? '#fee2e2' : '#ecfdf5', color: a.tipo === 'importante' ? '#991b1b' : '#065f46' }}>{a.tipo}</span></td>
                      <td>{a.autor?.name}</td>
                      <td style={{ fontSize: '0.9rem', color: '#9CA3AF' }}>{new Date(a.fecha).toLocaleDateString()}</td>
                      <td><button onClick={() => handleDelete(a.id)} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><TrashIcon style={{ width: 16 }} />Eliminar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
