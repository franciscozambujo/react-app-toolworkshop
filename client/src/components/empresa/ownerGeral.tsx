import {useVerifyToken} from '../verifyToken';

export function OwnerGeralMain() {
  const isValid = useVerifyToken();

  if (!isValid) {
    return <div>Você não está autenticado</div>;
  }

  return (
    <div>
      <h1>Bem-vindo, você está autenticado!</h1>
    </div>
  );
}