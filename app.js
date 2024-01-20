document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    const genderFilter = document.getElementById('genderFilter');
    const characterList = document.getElementById('characterList');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
  
    let page = 1;
    let currentSearch = '';
    let currentGenderFilter = 'all';
  
    function fetchCharacters() {
      const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}&name=${currentSearch}&gender=${currentGenderFilter}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const characters = data.results;
          characters.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.innerHTML = `<img src="${character.image}" alt="${character.name}">
                              <p>${character.name}</p>`;
            characterList.appendChild(card);
          });
        })
        .catch(error => console.error('Error fetching characters:', error));
    }
  
    function clearCharacterList() {
      characterList.innerHTML = '';
    }
  
    function loadMoreCharacters() {
      page++;
      fetchCharacters();
    }
  
    function handleSearch() {
      clearCharacterList();
      currentSearch = searchInput.value.trim();
      page = 1;
      fetchCharacters();
    }
  
    function handleGenderFilter() {
      clearCharacterList();
      currentGenderFilter = genderFilter.value;
      page = 1;
      fetchCharacters();
    }
  
    function clearSearchInput() {
      searchInput.value = '';
      clearSearch.style.display = 'none';
      searchInput.focus();
    }
  
    // Event Listeners
    searchInput.addEventListener('input', function () {
      clearSearch.style.display = this.value.trim() !== '' ? 'block' : 'none';
    });
  
    clearSearch.addEventListener('click', function () {
        clearSearchInput();
        searchInput.focus();
      });
  
    searchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        handleSearch();
      }
    });
  
    genderFilter.addEventListener('change', handleGenderFilter);
  
    loadMoreBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = '#0056b3';
      });
    
      loadMoreBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = '#007bff';
      });
      
    // Initial fetch
    fetchCharacters();
  });
  