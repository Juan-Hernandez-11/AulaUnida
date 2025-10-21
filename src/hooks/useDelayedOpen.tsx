import { useEffect, useState } from 'react';

// Hook que abre con delay para evitar parpadeos en cargas rápidas
export default function useDelayedOpen(open: boolean, delay = 250) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t: any;
    if (open) {
      t = setTimeout(() => setVisible(true), delay);
    } else {
      // si se cierra rápidamente, esconder inmediatamente
      setVisible(false);
    }
    return () => clearTimeout(t);
  }, [open, delay]);

  return visible;
}
