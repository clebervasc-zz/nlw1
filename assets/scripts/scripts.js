function populateUfs () {
  const ufSelect = document.querySelector("select[name=uf")
  const urlSearchUf = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

  ferchLocation(urlSearchUf, ufSelect)
}

function getCities (event) {
  const { selectedIndex, options, value } = event.target

  const idUf = value
  const citySelect = document.querySelector("[name=city")
  const stateInput = document.querySelector("[name=state")
  const urlSearchCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUf}/municipios`
  

  ferchLocation(urlSearchCities, citySelect)
    .then(() => {
      stateInput.value = options[selectedIndex].text
      citySelect.disabled = false
    })
}

function ferchLocation (url, selector) {
  return fetch(url)
    .then((response) => response.json())
    .then(payload => {
      for(const response of payload) {
        selector.innerHTML += `<option value=${response.id}>${response.nome}</option>`
      }
    })
}

// execute functions
populateUfs()

document
  .querySelector("select[name=uf")
  .addEventListener("change", getCities)