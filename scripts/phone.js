const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);
  displayPhones(phone, isShowAll);
};

const displayPhones = (phones,isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");

  //   clear phone container before adding new cards
  phoneContainer.textContent = "";
  // display showall butt if there are more than 12 phones

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // dispaly 12 cards at a time
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `
      <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
                 <h2 class="card-title">${phone.phone_name}</h2>
                 <p>If a dog chews shoes whose shoes does he choose?</p>
                 <div class="card-actions justify-center">
                  <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                 </div>
            </div>
      `;
    phoneContainer.appendChild(phoneCard);
  });
  //   hideLoadingSpinner
  toggleLoadingSpinner(false);
};

const handleShowDetails =async (id) => {
    console.log('clicked',id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    
    console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
    
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    `

    // show the modal
    show_details_modal.showModal();
}


const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};
// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//   const searchField = document.getElementById("search-field2");
//   const searchText = searchField.value;
//   loadPhone(searchText);
// };

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all button
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone('apple');
