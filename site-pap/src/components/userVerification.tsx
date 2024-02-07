function login(user: string, pass: string): boolean {
    const users: User[] = readUsersData(); // Leitura dos dados dos usuários
    const foundUser = users.find(u => u.user === user && u.pass === pass);
  
if (foundUser) {
  if (foundUser.permission === "empregado" && tipoUsuario === "empregado") {
    return true;
  } else if (foundUser.permission === "dono" && tipoUsuario === "dono") {
    return true;
  }
}
  return false;
}  