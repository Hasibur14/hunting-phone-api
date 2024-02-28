const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
};




const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';


    //display show all button 
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }


    // console.log('is show all', isShowAll)
    //display only first 12 phones
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-gray-100 p-8 shadow-xl`;
        phoneCard.innerHTML = `

        <figure><img src="${phone.image}"
        alt="Shoes" /></figure>
       <div class="card-body">
       <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
       </div>
       </div>
        `
        phoneContainer.appendChild(phoneCard)

    });

    //hide loading   spinner
    toggleLoadingSpinner(false);
};


const handleShowDetails = async (id) => {
    // load single phone
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText =phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img class="items-center text-center" src="${phone.image}" alt="">
    <p><span class="font-bold text-lg">Storage:</span>${phone.mainFeatures?.storage}</p>
    <p><span class="font-bold text-lg">Display Size: </span>${phone.mainFeatures.displaySize}</p>
    <p><span class="font-bold text-lg">Chipset:</span>${phone.mainFeatures.chipSet}</p>
    <p><span class="font-bold text-lg">Memory:</span>${phone.mainFeatures.memory}</p>
    <p><span class="font-bold text-lg">Slug:</span>${phone.slug}</p>
    <p><span class="font-bold text-lg">Release data: </span>${phone.releaseDate}</p>
    <p><span class="font-bold text-lg">Brand:</span>${phone.brand}</p>
    <p><span class="font-bold text-lg">GPS:</span>${phone.others?.GPS}</p>
  

    ` 

    show_details_modal.showModal()
  
}


const searchHandler = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);

}
// const searchHandler2 = () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);

// }

const toggleLoadingSpinner = (isLoading) => {

    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}


//handler show all button

const handleShowAll = () => {
    searchHandler(true)
};

// loadPhone()