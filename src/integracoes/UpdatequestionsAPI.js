import axios from "axios";

export const UpdatequestionsAPI = async (form_id, questionType,title,options) => {
    try {
       if(questionType === 'multipleChoice') {
        const response = await axios.patch(`http://localhost:3000/question/multiple-choice/${form_id}`,{
            question_body: {
                title: title,
                choices: options
            }

        })

        console.log('Pergunta Alterada !', response.data)
       }

       if (questionType === 'essay') {
        const response = await axios.patch(`http://localhost:3000/question/multi-line-dissertative/${form_id}`,{
            question_body: {
            title: title
             }
        })
        console.log('Pergunta Alterada !', response.data)

       }
    }
    catch (error) {
        console.error("Erro", error);
    }
};