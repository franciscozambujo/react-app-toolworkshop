import {AuthContext} from '@/data/AuthProvider'
import { useContext } from 'react';

export function OwnerGeralMain() {
  const { username } = useContext(AuthContext);

  return (
    <div>
      <h1>Bem-vindo {username}</h1>
    </div>
  );
}
