// loading main search Data
const loadPhoneData = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const phonesData = await res.json();
    displayPhoneData(phonesData.data);
}

// display phones
const displayPhoneData = (phones) => {

    phones.forEach(phone => {
        console.log(phone);
        const { brand, image, phone_name, slug } = phone;
        const phonesContainer = document.getElementById('phones-container');
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
}

loadPhoneData();