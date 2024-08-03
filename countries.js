let allCountries = [];

const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        allCountries = data; // Store the data for search functionality
        displayCountries(data);
    })
    .catch(error => console.error('Error:', error));
}

const displayCountries = (countries) => {
    const container = document.getElementById('countries-container');
    container.innerHTML = ''; // Clear previous content

    countries.forEach(element => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('country');
        
        // Create country details
        newDiv.innerHTML = ` 
            <h5>${element.name.common} (${element.cca3})</h5>
            <img src="${element.flags.png}" alt="Flag of ${element.name.common}">
            <div class="details">
                <p><strong>Official Name:</strong> ${element.name.official}</p>
                <p><strong>Capital:</strong> ${element.capital ? element.capital.join(', ') : 'N/A'}</p>
                <p><strong>Region:</strong> ${element.region}</p>
                <p><strong>Subregion:</strong> ${element.subregion}</p>
                <p><strong>Population:</strong> ${element.population.toLocaleString()}</p>
                <p><strong>Area:</strong> ${element.area.toLocaleString()} km²</p>
                <p><strong>Languages:</strong> ${element.languages ? Object.values(element.languages).join(', ') : 'N/A'}</p>
                <p><strong>Bordering Countries:</strong> ${element.borders ? element.borders.join(', ') : 'N/A'}</p>
                <p><strong>Currencies:</strong> ${element.currencies ? Object.values(element.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ') : 'N/A'}</p>
                <p><strong>Gini Index:</strong> ${element.gini ? element.gini[Object.keys(element.gini)[0]] : 'N/A'}</p>
                <p><strong>Driving Side:</strong> ${element.car.side}</p>
                <p><strong>Timezones:</strong> ${element.timezones.join(', ')}</p>
                <p><strong>Google Maps:</strong> <a href="${element.maps.googleMaps}" target="_blank">View on Map</a></p>
                <p><strong>Coat of Arms:</strong><br> <img src="${element.coatOfArms.png}" alt="Coat of Arms of ${element.name.common}" style="max-width: 50px;"></p>
                <p><strong>Flag Alt:</strong> ${element.flags.alt}</p>
            </div>
        `;
        
        container.appendChild(newDiv);
    });
}

const searchCountry = () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchInput) ||
        country.name.official.toLowerCase().includes(searchInput)
    );
    displayCountries(filteredCountries);
}

loadCountries();
