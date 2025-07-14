// === Event Management ===


export const api = {
  base: 'http://localhost:3000', // Change the URL if necessary
 
// Implements the GET function
  get: async param => {
    // TODO: Makes a GET request to the API and returns the data
    try {
      const response = await fetch(`${api.base}${param}`);
      if (!response.ok) {
        throw new Error('Error getting data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  },
 // Implements the POST function
  post: async (param, data) => {
    
// TODO: Make a POST request to the API with the data
    try {
      const response = await fetch(`${api.base}${param}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Error creating data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in POST request:', error);
      throw error;
    }
  },
  // Implementa la función PUT
  put: async (p, data) => {
    // TODO: Realiza una petición PUT a la API con los datos
    try {
      const response = await fetch(`${api.base}${p}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Error updating data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error;
    }
  },
  // Implements the DELETE function
  del: async p => {
   // TODO: Make a DELETE request to the API
    try {
      const response = await fetch(`${api.base}${p}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in the DELETE request:', error);
      throw error;
    }
  }
};
