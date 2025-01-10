const fetch = require('node-fetch');


const pythonLLMUrl = process.env.PYTHON_LLM_URL;

export const getTranslatorLanguage = async (text: string, lang: string): Promise<string> => {
  try {
    const data = { text: text, lang: lang };
    const response = await fetch(`${pythonLLMUrl}/translator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Erro na resposta: ${response.statusText}`);
    }
    const result = await response.json();    
    return  result.response || 'Resposta não encontrado'; 
    } catch (error) {
        throw new Error(`Erro ao obter resposta do serviço Python. ${error}`);
  }
};


export const getSummaryText = async (text: string, lang: string): Promise<string> => {
    try {
      const data = { text: text, lang: lang };
      const response = await fetch(`${pythonLLMUrl}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`Erro na resposta: ${response.statusText}`);
      }
      const result = await response.json();    
      return  result.response || 'Resposta não encontrado'; 
    } catch (error) {
      throw new Error(`Erro ao obter resposta do serviço Python. ${error}`);
    }
  };