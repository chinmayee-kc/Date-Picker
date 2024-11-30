let data = [];//this is to hold the json data

async function loadData() {

    try {
        const response = await fetch('emp.json');  
        data = await response.json();

        console.log("Data from json    : ", data);  // for checking

    } catch (error) {
        console.error('Error occured while loading a data that is     :', error);
    }

}

// Call loadData when the page loads
window.onload = () => {
    loadData();
};

// for filtering a data

function filterData() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;

    const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
    });

    displayData(filteredData);
}

// this function will display the data after filtering

function displayData(filteredData) {
    const tableBody = document.querySelector('#employeeDetailsTable tbody');
    tableBody.innerHTML = "";  // this will remove existing rows

    filteredData.forEach(item => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.empName}</td>
            <td>${item.date}</td>
            <td>${item.loginTime}</td>
            <td>${item.logoutTime}</td>
            <td>${item.phoneNum}</td>
        `;
        tableBody.appendChild(row);
    });
}