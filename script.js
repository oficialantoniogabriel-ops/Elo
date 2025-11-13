
// script.js - login + profile (Supabase)
const $ = (id) => document.getElementById(id);

const authSection = $('auth-section');
const profileSection = $('profile-section');
const authMsg = $('auth-msg');

$('btn-login').addEventListener('click', async () => {
  const email = $('login-email').value;
  const password = $('login-password').value;
  authMsg.textContent = 'Entrando...';
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    authMsg.textContent = 'Erro: ' + error.message;
    return;
  }
  authMsg.textContent = 'Entrou com sucesso.';
  showProfile(data.user);
});

$('btn-signup').addEventListener('click', async () => {
  const email = $('signup-email').value;
  const password = $('signup-password').value;
  authMsg.textContent = 'Registando...';
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    authMsg.textContent = 'Erro: ' + error.message;
    return;
  }
  authMsg.textContent = 'Conta criada — confirma o email se for pedido.';
  // If user is returned immediately (no confirm) show profile
  if (data?.user) showProfile(data.user);
});

$('btn-signout').addEventListener('click', async () => {
  await supabase.auth.signOut();
  showAuth();
});

function showProfile(user) {
  if (!user) return showAuth();
  $('profile-email').textContent = user.email || '—';
  $('profile-uid').textContent = user.id || '—';
  authSection.classList.add('hidden');
  profileSection.classList.remove('hidden');
}

function showAuth() {
  authSection.classList.remove('hidden');
  profileSection.classList.add('hidden');
  authMsg.textContent = '';
  $('login-email').value=''; $('login-password').value='';
  $('signup-email').value=''; $('signup-password').value='';
}

// Listen for auth state changes (e.g., persisted session)
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    showProfile(session.user);
  } else {
    showAuth();
  }
});

// Initial check
(async function init(){
  const { data } = await supabase.auth.getSession();
  if (data?.session?.user) {
    showProfile(data.session.user);
  } else {
    showAuth();
  }
})();
