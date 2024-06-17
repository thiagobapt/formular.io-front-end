import axios from "axios";

export const UpdateFormApi = async (user_id, forms_name) => {
    try {
        const response = await axios.patch(`http://localhost:3000/form/${user_id}`, {
            form_name: forms_name,
        })
        console.log('Formulário Criado !', response.data)

        const form_id = response.data?.form_id;

        if (form_id) {
            localStorage.setItem("form_id", response.data?.form_id);
            console.log("Form_id armazenado:", localStorage.getItem("form_id"));
        }
        else{
            throw new Error("Form_id não encontrado na resposta");
        }


    }
    catch (error) {
        console.error("Erro durante o login:", error);
    }
};