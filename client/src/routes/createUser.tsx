import { CreateUser } from '../components/create-user';
import { HeaderMenuNav } from '../components/headerMenu';

export function CreateNewUser () {

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