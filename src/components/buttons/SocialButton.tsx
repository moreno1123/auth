import { signIn } from "next-auth/react";
import * as React from "react";
import { FaGoogle } from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";

interface ISocialButtonProps {
  id: string;
  text: string;
  csrfToken: string;
}

const SocialButton: React.FunctionComponent<ISocialButtonProps> = (props) => {
  const { id, text, csrfToken } = props;

  return (
    <form method="post" action={`/api/auth/signin/${id}`}>
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <button
        className="bg-red-500 mb-2 py-2 flex justify-center items-center gap-2 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
        type="button"
        onClick={() => signIn(id)}
      >
        <FaGoogle />
        {text}
      </button>
    </form>
  );
};

export default SocialButton;
