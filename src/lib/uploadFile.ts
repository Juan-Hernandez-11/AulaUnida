import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './firebaseClient';

export async function uploadFileToStorage(file: File, path: string): Promise<string> {
  try {
    const storage = getStorage(app);
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    
    // Subir el archivo
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error subiendo archivo:', error);
    throw new Error('Error al subir el archivo');
  }
}
