// Simulação de banco de dados em memória
// Em produção real, isso seria PostgreSQL, MongoDB, etc.

// Usar globalThis para persistir dados entre hot reloads e navegações
if (typeof globalThis !== 'undefined') {
  if (!globalThis.superativoUsers) {
    globalThis.superativoUsers = [];
  }
  if (!globalThis.superativoNextId) {
    globalThis.superativoNextId = 1;
  }
}

let users = globalThis?.superativoUsers || [];
let nextId = globalThis?.superativoNextId || 1;

export const addUser = (userData) => {
  const newUser = {
    ...userData,
    id: nextId++,
    criadoEm: new Date().toISOString(),
    ultimoLogin: null
  };
  users.push(newUser);
  
  // Atualizar globalThis
  if (typeof globalThis !== 'undefined') {
    globalThis.superativoUsers = users;
    globalThis.superativoNextId = nextId;
  }
  
  console.log('🗄️ Usuário adicionado ao banco:', {
    id: newUser.id,
    nome: newUser.nomeCompleto,
    totalUsuarios: users.length
  });
  
  return newUser;
};

export const findUserByEmail = (email) => {
  const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
  console.log('🔍 Busca por email:', email, user ? 'ENCONTRADO' : 'NÃO ENCONTRADO');
  return user;
};

export const findUserById = (id) => {
  return users.find(user => user.id === id);
};

export const updateUserLogin = (userId) => {
  const user = findUserById(userId);
  if (user) {
    user.ultimoLogin = new Date().toISOString();
    
    // Atualizar globalThis
    if (typeof globalThis !== 'undefined') {
      globalThis.superativoUsers = users;
    }
    
    console.log('🔄 Login atualizado para:', user.nomeCompleto);
    return user;
  }
  return null;
};

export const getUsers = () => {
  console.log('📊 Total de usuários no banco:', users.length);
  return users;
};

export const getUserCount = () => users.length;

export const getRecentUsers = (limit = 3) => {
  return users
    .slice(-limit)
    .map(user => ({
      id: user.id,
      nome: user.nomeCompleto,
      email: user.email,
      criadoEm: user.criadoEm
    }));
};