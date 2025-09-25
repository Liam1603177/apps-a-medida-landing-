const API_BASE = 'https://apps-a-medida-api.onrender.com';
// Redirigir a gracias.html al enviar el formulario (modo estático)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) { console.warn('No se encontró #contactForm'); return; }


  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      mensaje: form.mensaje.value.trim(),
      _honey: ''
    };

    console.log('Enviando a API...', data); // debug

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      console.log('Respuesta API', res.status);
      if (res.ok) {
        window.location.href = 'gracias.html';
      } else {
        const err = await res.json().catch(()=>({}));
        alert('No pudimos enviar tu mensaje. ' + (err.error || 'Intentá de nuevo.'));
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con la API.');
    }
  });
});
