// loading main search Data
const loadPhoneData = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const phonesData = await res.json();
    displayPhoneData(phonesData.data, dataLimit);
}

// display phones
const displayPhoneData = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    // btn-show-all and limiting the data
    const showBtn = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 6);
        showBtn.classList.remove('d-none');
    }
    else {
        showBtn.classList.add('d-none');
    }
    // if no result found
    if (phones.length === 0) {
        document.getElementById('no-result').classList.remove('d-none');
    }
    else {
        document.getElementById('no-result').classList.add('d-none');
    }
    // displaying phones
    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 shadow p-3 mb-5 bg-body rounded">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${slug}')" id="btn-phone-details" class="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
          </div>
        </div>
        `
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner
    toggleSpinner(false);
}

// toggle Spinner functionality
const toggleSpinner = (isLoading) => {
    const spinnig = document.getElementById('loding-spinner');
    isLoading ? spinnig.classList.remove('d-none') : spinnig.classList.add('d-none');
}

// common function for get input value
const getSearch = (dataLimit) => {
    // start spinner
    toggleSpinner(true)
    const searchText = document.getElementById('search-input').value;
    loadPhoneData(searchText, dataLimit);
}

// search input by EventListener click
document.getElementById('btn-search').addEventListener('click', function () {
    getSearch(6);
});

// search input by EventListener keypress
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getSearch(6);
    }
});

// worst way of loading and limiting data
document.getElementById('btn-show-all').addEventListener('click', function () {
    getSearch();
})

// showing phone details on modal
const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const details = await res.json();
    // setting details on modal
    const { name, releaseDate, mainFeatures } = details.data;
    console.log(name, releaseDate, mainFeatures);
    document.getElementById('exampleModalLabel').innerText = name;
    const detailsDiv = document.getElementById('phone-details');

    detailsDiv.innerHTML = `
    <h6>Release Date: ${releaseDate ? releaseDate : 'no release date found'}</h6>
    `
    const ul = document.createElement('ul');
    mainFeatures.sensors.forEach(el => {
        const li = document.createElement('li');
        li.innerText = el
        ul.appendChild(li);
    })
    detailsDiv.appendChild(ul);
}


//loadPhoneData('phone');
