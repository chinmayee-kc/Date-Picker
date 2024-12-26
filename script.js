let data = [];//this is to hold the json data
const rowsPerPage = 5; //num of rows appear in a page
let currentPage = 1;
async function loadData() {

    try {
        const response = await fetch('emp.json');  
        data = await response.json();

        console.log("Data from json    : ", data);  // for checking
        displayData(data); // Diplay data after loading
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
        const itemDate = new Date(item.date); // this will convert date in json to date object
        return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
    });
    currentPage = 1; // reset to first page after filtering
    displayData(filteredData);
}

// this function will display the data after filtering

function displayData(filteredData) {
    const tableBody = document.querySelector('#employeeDetailsTable tbody'); // this will select table body element
    tableBody.innerHTML = "";  // this will remove existing rows
    
    const start = (currentPage - 1) + rowsPerPage; // index of 1st record for current page
    const end = start + rowsPerPage; // index of last record for current page
    const paginatedData = filteredData.slice(start, end); // this will extracts only required rows for current page
    // display paginated rows
    paginatedData.forEach(item => {
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
    setPagination(filteredData); // it will update pagination based on filtered data
}
// this function is for set up pagination controls
function setPagination(filteredData){
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = "" // it will clear existing paginatin controls

    const pageCount = Math.ceil(filteredData.length / rowsPerPage); // cal total num of pages
    for (let i=1; i<= pageCount; i++) { // this will loop through each page
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.className = 'page-btn';
        btn.onclick = () => {
            currentPage = i;
            displayData(filteredData);
        };
        pagination.appendChild(btn);
    }
}
//this function is for searching the data 

function searchTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();// retrieves the search input & converts it to lowercase 
    const filteredData = data.filter(item =>
        item.empName.toLowerCase().includes(searchInput) ||
        item.date.includes(searchInput) ||
        item.phoneNum.includes(searchInput) ||
        item.loginTime.includes(searchInput) ||
        item.logoutTime.includes(searchInput)
    );
    currentPage = 1;
    displayData(filteredData);
}