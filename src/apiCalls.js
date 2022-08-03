const getDetailsData = (detailsData) => {
    return fetch(`http://localhost:3001/api/v1/${detailsData}`)
            .then((response) => response.json())
};

const getCustomerData = (id) => {
    const url = 'http://localhost:3001/api/v1/customers';
    return fetch(`${url}${id}`)
            .then((response) => response.json())
};

const getAllData = (id) => {
    return Promise.all([
        getDetailsData('customers'),
        getCustomerData(id)
    ]);
};