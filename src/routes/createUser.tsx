import { Footer } from '@/components/footer';
import { CreateUser } from '../components/create-user';
import { HeaderMenuNav } from '../components/headerMenu';

export function CreateNewUser () {
  const imgBg = new URL("@/public/images/oficina_login.png", import.meta.url).href;

  return (
    <div className="bg-slate-800">
        <HeaderMenuNav />
      <div className="relative">
        <CreateUser />
      </div>
    </div>
  );
};