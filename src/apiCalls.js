export const getDetailsData = (detailsData) => {
    return fetch(`http://localhost:3001/api/v1/${detailsData}`)
            .then((response) => response.json())//this DOES return something that the next .then uses
            // .then((data) => console.log(data))//this does not return anything, it is just printing to the console. this will access the data from .json
            // .catch((error) => console.log(error))//if .then fails, then it goes to the catch
};

export const getCustomerData = (id) => {
    const url = 'http://localhost:3001/api/v1/customers';
    return fetch(`${url}${id}`)
            .then((response) => response.json())
};

export const getAllData = (id) => {
    return Promise.all([
        getDetailsData('customers'),
        getCustomerData(id)
    ]);
};

