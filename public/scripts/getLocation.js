async function fetchLocation (url, selector) {
  const data = await fetch(url)
  const payload = await data.json()
  for (const response of payload) {
    const val = selector.name !== 'city' ? response.id : response.nome
    selector.innerHTML += `<option value=${val}>${response.nome}</option>`
  }
}

export function populateUfs () {
  const ufSelect = document.querySelector("select[name=uf")
  const urlSearchUf = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

  fetchLocation(urlSearchUf, ufSelect)
}

export function getCities (event) {
  const { selectedIndex, options, value } = event.target

  const idUf = value
  const citySelect = document.querySelector("[name=city")
  const stateInput = document.querySelector("[name=state")
  const urlSearchCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUf}/municipios`

  citySelect.innerHTML = '<option value="" selected disabled>Selecione a cidade</option>'
  citySelect.disabled = true
  
  fetchLocation(urlSearchCities, citySelect)
    .then(() => {
      stateInput.value = options[selectedIndex].text
      citySelect.disabled = false
    })
}