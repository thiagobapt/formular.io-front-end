import axios from "axios";

export const CreatequestionsAPI = async (form_id, questionType,title,options) => {
    try {
       if(questionType === 'multipleChoice') {
        const response = await axios.post("http://localhost:3000/question/multiple-choice",{
            formId: form_id,
            question_body: {
                title: title,
                choices: [
                  options
                ]
            }

        })

        console.log('Pergunta Criada !', response.data)
       }

       if (questionType === 'essay') {
        const response = await axios.post("http://localhost:3000/question/multi-line-dissertative",{
            formId: form_id,
            question_body: {
            title: title
             }
        })
        console.log('Pergunta Criada !', response.data)

       }
    }
    catch (error) {
        console.error("Erro", error);
    }
};