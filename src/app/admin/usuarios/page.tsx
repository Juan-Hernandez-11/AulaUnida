"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import formStyles from '../../../styles/admin-user-form.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';

import Button from '../../../components/ui/Button';
import TriangleIcon from '../../../components/icons/TriangleIcon';

// Botón de volver reutilizable
function BackToDashboardButton() {
  return (
  <div style={{ marginBottom: 24 }}>
  <NextLink href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 500 }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Volver al Dashboard
      </NextLink>
    </div>
  );
}

type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  gender?: string;
  photoUrl?: string;
  firebaseUid?: string;
};


const sidebarLinks = [
  { label: 'Crear Usuario', icon: UserCircleIcon, href: '/admin/usuarios', active: true },
  { label: 'Listado de usuarios', icon: UserCircleIcon, href: '/admin/usuarios/listado' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'admin',
    documentType: '',
    documentNumber: '',
    birthDate: '',
    phone: '',
    address: '',
    gender: '',
    photoUrl: ''
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //    firebaseUid: '', // Solo para edición, no para creación
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Estado para errores de validación en tiempo real
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    firebaseUid?: string;
    documentType?: string;
    documentNumber?: string;
    birthDate?: string;
    phone?: string;
    address?: string;
    gender?: string;
    photoUrl?: string;
  }>({});

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch('/api/admin/usuarios');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Error cargando usuarios:', error);
      }
      setLoading(false);
    };
    
    loadUsers();
  }, []);

  // Manejar edición por URL
  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId && users.length > 0) {
      const userToEdit = users.find(u => u.id === parseInt(editId));
      if (userToEdit) {
        handleEdit(userToEdit);
      }
    }
  }, [searchParams, users]);

  // Obtener usuarios al cargar
  // Cargar usuarios manualmente cuando sea necesario (ejemplo: con un botón o tras crear/editar)

  // Manejar cambios en el formulario
  // Validación en tiempo real
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'El nombre es obligatorio.';
      else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(value.trim())) error = 'El nombre debe tener solo letras y al menos 3 caracteres.';
    }
    if (name === 'email') {
      if (!value.trim()) error = 'El correo es obligatorio.';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) error = 'Correo inválido.';
      else if (users.some(u => u.email.toLowerCase() === value.toLowerCase()) && (!editingId || users.find(u => u.id === editingId)?.email !== value)) error = 'Este correo ya está registrado.';
    }
    if (name === 'documentType') {
      if (!value.trim()) error = 'Tipo de documento obligatorio.';
    }
    if (name === 'documentNumber') {
      if (!value.trim()) error = 'Número de documento obligatorio.';
      else if (!/^\d{5,}$/.test(value)) error = 'El número de documento debe ser numérico y mínimo 5 dígitos.';
      else if (users.some(u => u.documentNumber === value) && (!editingId || users.find(u => u.id === editingId)?.documentNumber !== value)) error = 'Este número de documento ya está registrado.';
    }
    if (name === 'birthDate') {
      if (!value.trim()) error = 'Fecha de nacimiento obligatoria.';
      else {
        const birth = new Date(value);
        const now = new Date();
        if (birth > now) error = 'La fecha de nacimiento no puede ser futura.';
        const age = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
        if (age < 5) error = 'La edad mínima es 5 años.';
      }
    }
    if (name === 'phone') {
      if (!value.trim()) error = 'Teléfono obligatorio.';
      else if (!/^\d{7,10}$/.test(value)) error = 'El teléfono debe tener entre 7 y 10 dígitos.';
      else if (value.startsWith('0')) error = 'El teléfono no debe empezar por 0.';
    }
    if (name === 'address') {
      if (!value.trim() || value.trim().length < 5) error = 'La dirección debe tener al menos 5 caracteres.';
    }
    if (name === 'gender') {
      if (!['M', 'F', 'O'].includes(value)) error = 'Selecciona un género válido.';
    }
    if (name === 'photoUrl' && value) {
      if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value)) error = 'La foto debe ser una URL de imagen válida.';
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file' && name === 'photo') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setPhotoFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPhotoPreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
      setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Crear o editar usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    // Validación global antes de enviar
    const newErrors: typeof fieldErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
    };
      // No validar firebaseUid en creación
    setFieldErrors(newErrors);
    if (newErrors.name || newErrors.email) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        // Editar usuario existente
        const res = await fetch('/api/admin/usuarios', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id: editingId, 
            name: form.name, 
            email: form.email, 
            role: form.role,
            documentType: form.documentType,
            documentNumber: form.documentNumber,
            birthDate: form.birthDate,
            phone: form.phone,
            address: form.address,
            gender: form.gender,
            photoUrl: form.photoUrl
          }),
        });
        
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar usuario');
          setSuccess('');
        } else {
          const updatedUser = await res.json();
          setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
          setForm({
            name: '',
            email: '',
            role: 'admin',
            documentType: '',
            documentNumber: '',
            birthDate: '',
            phone: '',
            address: '',
            gender: '',
            photoUrl: ''
          });
          setEditingId(null);
          setSuccess('Usuario actualizado correctamente');
          setError('');
        }
      } else {
        // Crear nuevo usuario
        const res = await fetch('/api/admin/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear usuario');
          setSuccess('');
        } else {
          const newUser = await res.json();
          setUsers(prev => [...prev, newUser]);
          setForm({
            name: '',
            email: '',
            role: 'admin',
            documentType: '',
            documentNumber: '',
            birthDate: '',
            phone: '',
            address: '',
            gender: '',
            photoUrl: ''
          });
          setSuccess('Usuario creado correctamente');
          setError('');
        }
      }
    } catch (err) {
      setError('Error de red');
      setSuccess('');
    }
    setCreating(false);
  };

  // Eliminar usuario
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      const res = await fetch('/api/admin/usuarios', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar usuario');
      } else {
        setUsers(prev => prev.filter(u => u.id !== id));
      }
    } catch (err) {
      setError('Error de red');
    }
  };

  // Editar usuario (cargar datos en el formulario)
  const handleEdit = (user: User) => {
    setForm({
      name: user.name || '',
      email: user.email,
      role: user.role,
      documentType: user.documentType || '',
      documentNumber: user.documentNumber || '',
      birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
      phone: user.phone || '',
      address: user.address || '',
      gender: user.gender || '',
      photoUrl: user.photoUrl || ''
    });
    setEditingId(user.id);
    setError('');
    setSuccess('');
    setFieldErrors({});
    
    // Limpiar URL para evitar re-edición accidental
    if (window.history.replaceState) {
      window.history.replaceState({}, '', '/admin/usuarios');
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <Image src="/favicon.ico" alt="AulaUnida Admin" className={styles.avatar} width={32} height={32} />
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
        {/* Main Content */}
        <main className={styles.mainContent}>
          <BackToDashboardButton />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 className={styles.title}>Gestión de Usuarios</h1>
            <NextLink 
              href="/admin/usuarios/listado"
              style={{
                background: '#22c55e',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Ver listado de usuarios
            </NextLink>
          </div>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>
              {editingId 
                ? `Editar Usuario: ${form.name || 'Cargando...'}`
                : 'Crear Nuevo Usuario'
              }
            </h2>
            {editingId && (
              <p style={{ color: '#64748B', marginBottom: '1rem', fontSize: '14px' }}>
                Modifica los campos que desees actualizar para este usuario.
              </p>
            )}
            {success && (
              <div style={{ 
                color: '#22c55e', 
                marginBottom: '1rem', 
                padding: '8px 12px',
                backgroundColor: '#0f172a',
                borderRadius: '4px',
                border: '1px solid #22c55e'
              }}>
                {success}
              </div>
            )}
            <form className="grid grid-cols-1 gap-6 bg-[#232734] p-8 rounded-xl shadow-lg"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '1.5rem',
              }}
              onSubmit={handleSubmit}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
              }}>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Nombre completo</label>
                  <input className={formStyles.adminFormInput} placeholder="Nombre completo" name="name" value={form.name || ''} onChange={handleChange} disabled={creating} autoComplete="off" />
                  {fieldErrors.name && <span className={formStyles.adminFormError}>{fieldErrors.name}</span>}
                </div>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Correo electrónico</label>
                  <input className={formStyles.adminFormInput} placeholder="Correo electrónico" name="email" value={form.email || ''} onChange={handleChange} disabled={creating} type="email" autoComplete="off" />
                  {fieldErrors.email && <span className={formStyles.adminFormError}>{fieldErrors.email}</span>}
                </div>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Rol</label>
                  <select className={formStyles.adminFormSelect} name="role" value={form.role || ''} onChange={handleChange} disabled={creating}>
                    <option value="admin">admin</option>
                    <option value="docente">docente</option>
                    <option value="estudiante">estudiante</option>
                  </select>
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
              }}>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Tipo de documento</label>
                  <select className={formStyles.adminFormSelect} name="documentType" value={form.documentType || ''} onChange={handleChange} disabled={creating}>
                    <option value="">Tipo de documento</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="PAS">Pasaporte</option>
                  </select>
                  {fieldErrors.documentType && <span className={formStyles.adminFormError}>{fieldErrors.documentType}</span>}
                </div>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Número de documento</label>
                  <input className={formStyles.adminFormInput} placeholder="Número de documento" name="documentNumber" value={form.documentNumber || ''} onChange={handleChange} disabled={creating} autoComplete="off" />
                  {fieldErrors.documentNumber && <span className={formStyles.adminFormError}>{fieldErrors.documentNumber}</span>}
                </div>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Fecha de nacimiento</label>
                  <input className={formStyles.adminFormInput} type="date" name="birthDate" value={form.birthDate || ''} onChange={handleChange} disabled={creating} />
                  {fieldErrors.birthDate && <span className={formStyles.adminFormError}>{fieldErrors.birthDate}</span>}
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
              }}>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Teléfono</label>
                  <input className={formStyles.adminFormInput} placeholder="Teléfono" name="phone" value={form.phone || ''} onChange={handleChange} disabled={creating} autoComplete="off" />
                  {fieldErrors.phone && <span className={formStyles.adminFormError}>{fieldErrors.phone}</span>}
                </div>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Dirección</label>
                  <input className={formStyles.adminFormInput} placeholder="Dirección" name="address" value={form.address || ''} onChange={handleChange} disabled={creating} autoComplete="off" />
                  {fieldErrors.address && <span className={formStyles.adminFormError}>{fieldErrors.address}</span>}
                </div>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Género</label>
                  <select className={formStyles.adminFormSelect} name="gender" value={form.gender || ''} onChange={handleChange} disabled={creating}>
                    <option value="">Género</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                  </select>
                  {fieldErrors.gender && <span className={formStyles.adminFormError}>{fieldErrors.gender}</span>}
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '1.5rem',
              }}>
                <div className={formStyles.adminFormField}>
                  <label className={formStyles.adminFormLabel}>Foto de perfil</label>
                  <input type="file" accept="image/*" name="photo" onChange={handleChange} disabled={creating} className={formStyles.adminFormInput} />
                  {photoPreview && (
                    <Image src={photoPreview} alt="Vista previa foto de perfil" className={formStyles.adminFormPhotoPreview} width={100} height={100} />
                  )}
                </div>
                {editingId && (
                  <div className={formStyles.adminFormField}>
                    <label className={formStyles.adminFormLabel}>Firebase UID</label>
                    <input className={formStyles.adminFormInput} placeholder="Firebase UID" name="firebaseUid" value={users.find(u => u.id === editingId)?.firebaseUid || ''} disabled readOnly autoComplete="off" />
                  </div>
                )}
              </div>
              <div className="col-span-1 md:col-span-3 flex gap-2 mt-2">
                <button
                  className={formStyles.adminFormButton + ' flex-1'}
                  type="submit"
                  disabled={creating || Object.values(fieldErrors).some(Boolean)}
                >
                  {creating 
                    ? (editingId ? 'Actualizando usuario...' : 'Creando usuario...') 
                    : (editingId ? 'Actualizar usuario' : 'Crear usuario')
                  }
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    className={formStyles.adminFormButton + ' flex-1'} 
                    style={{ background: '#64748B', color: '#fff' }} 
                    onClick={() => { 
                      setEditingId(null); 
                      setForm({ 
                        name: '', 
                        email: '', 
                        role: 'admin', 
                        documentType: '', 
                        documentNumber: '', 
                        birthDate: '', 
                        phone: '', 
                        address: '', 
                        gender: '', 
                        photoUrl: '' 
                      }); 
                      setError(''); 
                      setSuccess('');
                      setFieldErrors({});
                    }} 
                    disabled={creating}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>
            {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
          </div>
          {/* El listado de usuarios ahora está en /admin/usuarios/listado */}
        </main>
      </div>
    </ProtectedRoute>
  );
}