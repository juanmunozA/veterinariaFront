const TOKEN_KEY = 'veterinaria_token';
const USER_KEY = 'veterinaria_user';

const AuthService = {
  login: async (email, cedula) => {
    const mock = process.env.REACT_APP_MOCK_AUTH === 'true';
    if (mock) {
      const fakeToken = btoa(`${email}:${cedula}:${Date.now()}`);
      localStorage.setItem(TOKEN_KEY, fakeToken);
      localStorage.setItem(USER_KEY, JSON.stringify({ email }));
      return { token: fakeToken, email };
    }

    // Ajustado al controlador LoginControlador (POST /api/LoginControlador/login)
    const base = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5121';
    const url = `${base.replace(/\/$/, '')}/api/LoginControlador/login`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: cedula }),
    });

    if (!res.ok) {
      // try to extract server error message
      let text;
      try { text = await res.text(); } catch (_) { text = res.statusText; }
      throw new Error(text || `Login failed (${res.status})`);
    }

    const data = await res.json();

    // soportar distintos nombres para el token que el backend pueda devolver
    const token = data && (data.token || data.accessToken || data.access_token || data.Token || data.access) || null;
    if (!token) {
      // si no viene token, guardar la respuesta completa para depuración
      localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    } else {
      localStorage.setItem(TOKEN_KEY, token);
    }

    // almacenar info mínima de usuario si el backend la devuelve
    const user = data.user || data.usuario || { email };
    try { localStorage.setItem(USER_KEY, JSON.stringify(user)); } catch (_) {}

    return data;
  },

  logout: () => {
    try { localStorage.removeItem(TOKEN_KEY); } catch (_) {}
    try { localStorage.removeItem(USER_KEY); } catch (_) {}
  },

  getToken: () => {
    try { return localStorage.getItem(TOKEN_KEY); } catch (_) { return null; }
  },

  getUser: () => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  },

  isAuthenticated: () => Boolean(localStorage.getItem(TOKEN_KEY)),
};

export default AuthService;