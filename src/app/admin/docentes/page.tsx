import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/admin-docentes.module.css';

interface Docente {
  id: number;
  name: string;
  email: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  gender?: string;
  photoUrl?: string;
  role: string;
}

const initialForm: Partial<Docente> = {
  name: '',
  email: '',
  documentType: '',
  documentNumber: '',
  birthDate: '',
  phone: '',
  address: '',
  gender: '',
  photoUrl: '',
};

interface Asignacion {
  id: number;
  materiaGrado: {
    materia: { id: number; nombre: string };
    grado: { id: number; nombre: string; seccion: string };
  };
  periodo: { id: number; nombre: string } | null;
}

export default function AdminDocentesPage() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof Docente, string>>>({});
  const [loading, setLoading] = useState(true);
  // Para asignaciones
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [materias, setMaterias] = useState<{ id: number; nombre: string }[]>([]);
  const [grados, setGrados] = useState<{ id: number; nombre: string; seccion: string }[]>([]);
  const [periodos, setPeriodos] = useState<{ id: number; nombre: string }[]>([]);
  const [asigForm, setAsigForm] = useState<{ materiaId: string; gradoId: string; periodoId: string }>({ materiaId: '', gradoId: '', periodoId: '' });
  const [asigError, setAsigError] = useState('');
  const [asigLoading, setAsigLoading] = useState(false);

  useEffect(() => {
    fetchDocentes();
  }, []);

  const fetchDocentes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/docentes');
      const data = await res.json();
      setDocentes(data);
    } catch {
      setError('Error al cargar docentes');
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'El nombre es obligatorio.';
      else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(value.trim())) error = 'El nombre debe tener solo letras y al menos 3 caracteres.';
    }
    if (name === 'email') {
      if (!value.trim()) error = 'El correo es obligatorio.';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) error = 'Correo inválido.';
    }
    if (name === 'documentNumber') {
      if (!value.trim()) error = 'Número de documento obligatorio.';
      else if (!/^\d{5,}$/.test(value)) error = 'Debe ser numérico y mínimo 5 dígitos.';
    }
    if (name === 'birthDate') {
      if (!value.trim()) error = 'Fecha de nacimiento obligatoria.';
    }
    if (name === 'phone') {
      if (!value.trim()) error = 'Teléfono obligatorio.';
      else if (!/^\d{7,10}$/.test(value) || value.startsWith('0')) error = 'Debe tener entre 7 y 10 dígitos, no empezar por 0.';
    }
    if (name === 'address') {
      if (!value.trim()) error = 'Dirección obligatoria.';
      else if (value.length < 5) error = 'Debe tener al menos 5 caracteres.';
    }
    if (name === 'gender') {
      if (!['M', 'F', 'O'].includes(value)) error = 'Selecciona un género válido.';
    }
    if (name === 'photoUrl' && value) {
      if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value)) error = 'La foto debe ser una URL de imagen válida.';
    }
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    setSuccess('');
    // Validación global
    const newErrors: Partial<Record<keyof Docente, string>> = {
      name: validateField('name', form.name || ''),
      email: validateField('email', form.email || ''),
      documentNumber: validateField('documentNumber', form.documentNumber || ''),
      birthDate: validateField('birthDate', form.birthDate || ''),
      phone: validateField('phone', form.phone || ''),
      address: validateField('address', form.address || ''),
      gender: validateField('gender', form.gender || ''),
      photoUrl: validateField('photoUrl', form.photoUrl || ''),
    };
    setFieldErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/docentes', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');
      setSuccess(editingId ? 'Docente actualizado.' : 'Docente registrado.');
      setForm(initialForm);
      setEditingId(null);
      fetchDocentes();
    } catch (err: any) {
      setError(err.message || 'Error al guardar docente');
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async (docente: Docente) => {
    setForm({ ...docente, birthDate: docente.birthDate ? docente.birthDate.slice(0, 10) : '' });
    setEditingId(docente.id);
    setError('');
    setSuccess('');
    setFieldErrors({});
    // Cargar asignaciones y catálogos
    setAsigLoading(true);
    try {
      const [asigRes, matRes, gradRes, perRes] = await Promise.all([
        fetch(`/api/admin/docentes/${docente.id}/asignaciones`).then(r => r.json()),
        fetch('/api/admin/materias').then(r => r.json()),
        fetch('/api/admin/grados').then(r => r.json()),
        fetch('/api/admin/periodos').then(r => r.json()),
      ]);
      setAsignaciones(asigRes);
      setMaterias(matRes.map((m: any) => ({ id: m.id, nombre: m.nombre })));
      setGrados(gradRes);
      setPeriodos(perRes);
    } catch {
      setAsigError('Error al cargar asignaciones o catálogos');
    } finally {
      setAsigLoading(false);
    }
  };
  // Asignaciones: agregar
  const handleAsigChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAsigForm(f => ({ ...f, [name]: value }));
  };

  const handleAsigAdd = async (e: FormEvent) => {
    e.preventDefault();
    setAsigError('');
    if (!asigForm.materiaId || !asigForm.gradoId || !asigForm.periodoId) {
      setAsigError('Selecciona materia, grado y periodo');
      return;
    }
    setAsigLoading(true);
    try {
      const res = await fetch(`/api/admin/docentes/${editingId}/asignaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materiaId: Number(asigForm.materiaId),
          gradoId: Number(asigForm.gradoId),
          periodoId: Number(asigForm.periodoId),
        }),
      });
      if (!res.ok) throw new Error('Error al asignar');
      setAsigForm({ materiaId: '', gradoId: '', periodoId: '' });
      // Refrescar asignaciones
      const asigRes = await fetch(`/api/admin/docentes/${editingId}/asignaciones`).then(r => r.json());
      setAsignaciones(asigRes);
    } catch {
      setAsigError('Error al asignar');
    } finally {
      setAsigLoading(false);
    }
  };

  // Asignaciones: eliminar
  const handleAsigDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta asignación?')) return;
    setAsigLoading(true);
    try {
      const res = await fetch(`/api/admin/docentes/${editingId}/asignaciones`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materiaGradoDocenteId: id }),
      });
      if (!res.ok) throw new Error('Error al eliminar');
      // Refrescar asignaciones
      const asigRes = await fetch(`/api/admin/docentes/${editingId}/asignaciones`).then(r => r.json());
      setAsignaciones(asigRes);
    } catch {
      setAsigError('Error al eliminar asignación');
    } finally {
      setAsigLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que deseas eliminar este docente?')) return;
    setCreating(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/docentes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');
      setSuccess('Docente eliminado.');
      fetchDocentes();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar docente');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className={styles['admin-docentes-root']}>
      <h2>Gestión de Docentes</h2>
      <form className={styles['admin-docentes-form']} onSubmit={handleSubmit}>
        {/* ...campos del formulario... */}
        <div>
          <label>Nombre</label>
          <input name="name" value={form.name || ''} onChange={handleChange} disabled={creating} />
          {fieldErrors.name && <span className={styles.error}>{fieldErrors.name}</span>}
        </div>
        <div>
          <label>Correo</label>
          <input name="email" value={form.email || ''} onChange={handleChange} disabled={creating} />
          {fieldErrors.email && <span className={styles.error}>{fieldErrors.email}</span>}
        </div>
        <div>
          <label>Tipo de documento</label>
          <input name="documentType" value={form.documentType || ''} onChange={handleChange} disabled={creating} />
        </div>
        <div>
          <label>Número de documento</label>
          <input name="documentNumber" value={form.documentNumber || ''} onChange={handleChange} disabled={creating} />
          {fieldErrors.documentNumber && <span className={styles.error}>{fieldErrors.documentNumber}</span>}
        </div>
        <div>
          <label>Fecha de nacimiento</label>
          <input type="date" name="birthDate" value={form.birthDate || ''} onChange={handleChange} disabled={creating} />
          {fieldErrors.birthDate && <span className={styles.error}>{fieldErrors.birthDate}</span>}
        </div>
        <div>
          <label>Teléfono</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} disabled={creating} />
          {fieldErrors.phone && <span className={styles.error}>{fieldErrors.phone}</span>}
        </div>
        <div>
          <label>Dirección</label>
          <input name="address" value={form.address || ''} onChange={handleChange} disabled={creating} />
          {fieldErrors.address && <span className={styles.error}>{fieldErrors.address}</span>}
        </div>
        <div>
          <label>Género</label>
          <select name="gender" value={form.gender || ''} onChange={handleChange} disabled={creating}>
            <option value="">Selecciona</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          {fieldErrors.gender && <span className={styles.error}>{fieldErrors.gender}</span>}
        </div>
        <div>
          <label>Foto (URL)</label>
          <input name="photoUrl" value={form.photoUrl || ''} onChange={handleChange} disabled={creating} />
          {fieldErrors.photoUrl && <span className={styles.error}>{fieldErrors.photoUrl}</span>}
        </div>
        <button type="submit" disabled={creating}>{editingId ? 'Actualizar' : 'Registrar'}</button>
        {editingId && <button type="button" onClick={() => { setForm(initialForm); setEditingId(null); setFieldErrors({}); setError(''); setSuccess(''); setAsignaciones([]); }} disabled={creating}>Cancelar</button>}
        {error && <div className={styles['error-message']}>{error}</div>}
        {success && <div className={styles['success-message']}>{success}</div>}
      </form>
      {/* Sección de asignaciones solo al editar */}
      {editingId && (
        <div style={{ margin: '2rem 0' }}>
          <h3>Asignaciones de este docente</h3>
          <form onSubmit={handleAsigAdd} className={styles['admin-docentes-form']} style={{ marginBottom: 0 }}>
            <div>
              <label>Materia</label>
              <select name="materiaId" value={asigForm.materiaId} onChange={handleAsigChange} disabled={asigLoading}>
                <option value="">Selecciona</option>
                {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
              </select>
            </div>
            <div>
              <label>Grado</label>
              <select name="gradoId" value={asigForm.gradoId} onChange={handleAsigChange} disabled={asigLoading}>
                <option value="">Selecciona</option>
                {grados.map(g => <option key={g.id} value={g.id}>{g.nombre} {g.seccion}</option>)}
              </select>
            </div>
            <div>
              <label>Periodo</label>
              <select name="periodoId" value={asigForm.periodoId} onChange={handleAsigChange} disabled={asigLoading}>
                <option value="">Selecciona</option>
                {periodos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
            </div>
            <button type="submit" disabled={asigLoading}>Agregar asignación</button>
            {asigError && <div className={styles['error-message']}>{asigError}</div>}
          </form>
          <table className={styles['admin-docentes-table']} style={{ marginTop: 16 }}>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Grado</th>
                <th>Periodo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>Sin asignaciones</td></tr>
              )}
              {asignaciones.map(asig => (
                <tr key={asig.id}>
                  <td>{asig.materiaGrado.materia.nombre}</td>
                  <td>{asig.materiaGrado.grado.nombre} {asig.materiaGrado.grado.seccion}</td>
                  <td>{asig.periodo ? asig.periodo.nombre : '-'}</td>
                  <td>
                    <button onClick={() => handleAsigDelete(asig.id)} disabled={asigLoading}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <hr />
      <h3>Listado de Docentes</h3>
      {loading ? <p>Cargando...</p> : (
        <table className={styles['admin-docentes-table']}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {docentes.map(docente => (
              <tr key={docente.id}>
                <td>{docente.name}</td>
                <td>{docente.email}</td>
                <td>{docente.documentNumber}</td>
                <td>{docente.phone}</td>
                <td>{docente.address}</td>
                <td>{docente.gender}</td>
                <td>
                  <button onClick={() => handleEdit(docente)} disabled={creating}>Editar</button>
                  <button onClick={() => handleDelete(docente.id)} disabled={creating}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
