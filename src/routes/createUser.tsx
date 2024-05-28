import { Footer } from '@/components/footer';
import { CreateUser } from '../components/create-user';
import { HeaderMenuNav } from '../components/headerMenu';

export function CreateNewUser () {
  const imgBg = new URL("@/public/images/oficina_login.png", import.meta.url).href;

  return (
    <div>
      <div className="bg-[#282828]">
          <HeaderMenuNav />
      </div>
      <div className="bg-[#181818]">
          <CreateUser />
      </div>
    </div>
  );
};