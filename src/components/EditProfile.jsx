import {useContext, useRef, useState} from 'react';
import Avatar from "./Avatar.jsx";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {BsPencilSquare} from "react-icons/bs";

const EditProfile = function() {
    const { name, email, role, alamat } = useContext(AuthContext);
    const [inputName, setInputName] = useState("Jongkook");
    const [inputAlamat, setInputAlamat] = useState("");
    const [editable, setEditable] = useState(false);

    // Logic for toggle editing
    const toggleEdit = () => {
        setEditable(!editable)
        setInputName("Jongkook");
    }

    return (
        <main className="min-h-screen bg-white py-6 px-10 flex flex-col gap-8">
            <h1 className="text-4xl text-primary font-bold ">
                Your Profile
            </h1>
            <Avatar className="scale-[2] origin-top-left mb-14"/>
            <div className="flex justify-between items-start">
                <div className="flex-col gap-5">
                    <div>
                        <h2 className="text-lg text-primary">
                            Nama
                        </h2>
                        {editable ? (
                            <input type="text" value={inputName} onChange={(e) => {
                                setInputName(e.target.value)
                            }} className="input bg-white"/>
                        ) : (
                            <h3 className="text-xl text-primary-content">
                                Jongkook
                            </h3>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg text-primary">
                            Email
                        </h2>
                        <h3 className="text-xl text-primary-content">
                            {email}
                        </h3>
                    </div>
                    <div>
                        <h2 className="text-lg text-primary">
                            Alamat
                        </h2>
                        {editable ? (
                            <input type="text" value={alamat} onChange={(e) => {
                                setInputAlamat(e.target.value)
                            }} className="input bg-white"/>
                        ) : (
                            <h3 className="text-xl text-primary-content">
                                Jongkook
                            </h3>
                        )}
                    </div>
                </div>
                <button onClick={toggleEdit}>
                    <BsPencilSquare size={25}/>
                </button>
            </div>
        </main>
    )
}

export default EditProfile;