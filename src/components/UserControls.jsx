import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useAuthenticate from "../hooks/useAuthenticate";
import useMiscStore from "../store/miscStore";
import useViewStore from "../store/viewStore";

const UserControls = ({ video }) => {
    const { auth } = useAuthContext();
    const { signout } = useAuthenticate();
    const navigate = useNavigate();

    const { dropdownActive, toggleDropdownActive } = useMiscStore();
    const { openModal } = useViewStore();

    return (
        <>
            {/* logo & user */}
            <div className="absolute top-3 left-3 flex items-start gap-2">
                <span
                    className="material-symbols-outlined drop-shadow-3xl text-[2.5rem] select-none cursor-pointer relative"
                    onClick={() =>
                        auth ? toggleDropdownActive() : navigate("/auth")
                    }
                >
                    account_circle
                    <div
                        className={`${
                            dropdownActive
                                ? ""
                                : "opacity-0 pointer-events-none"
                        } user-dropdown transition bg-primary-1 text-base absolute left-1/2 mt-[10px] p-2 rounded-lg rounded-tl-none z-10 cursor-auto flex flex-col justify-center items-center`}
                    >
                        <p>{auth?.userDocument.username}</p>
                        <hr className="bg-white h-[2px] my-3 w-full" />
                        <button
                            onClick={signout}
                            className="text-error w-full rounded-lg flex justify-center items-center py-1 hover:bg-[rgba(255,255,255,0.1)] transition"
                            type="button"
                            title="Sign Out"
                        >
                            <span className="material-symbols-outlined ">
                                logout
                            </span>
                        </button>
                    </div>
                </span>
            </div>

            {/* show post modal button */}
            <button
                type="button"
                onClick={() => (auth ? openModal(video) : navigate("/auth"))}
                className="absolute w-[2.5rem] h-[2.5rem] top-3 left-14 rounded-full flex justify-center items-center bg-gradient-to-br from-primary-1 to-primary-2 scale-90 hover:scale-75 transition cursor-pointer"
                title="Post Video"
            >
                <span className="material-symbols-outlined drop-shadow-3xl text-3xl font-bold">
                    add
                </span>
            </button>
        </>
    );
};

export default UserControls;
