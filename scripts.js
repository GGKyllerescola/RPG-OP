function saveCharacters() {
    const container = document.getElementById('characters-container');
    const characters = Array.from(container.children).map(characterDiv => {
        const name = characterDiv.querySelector('.name-label').textContent.replace('Nome: ', '');
        const health = parseInt(characterDiv.querySelector('.bar-value').textContent);
        const stamina = parseInt(characterDiv.querySelector('.stamina-bar-value').textContent);
        const imgSrc = characterDiv.querySelector('img') ? characterDiv.querySelector('img').src : null;
        return { name, health, stamina, imgSrc };
    });
    localStorage.setItem('characters', JSON.stringify(characters));
}

function loadCharacters() {
    const characters = JSON.parse(localStorage.getItem('characters') || '[]');
    const container = document.getElementById('characters-container');

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');

        if (character.imgSrc) {
            const img = document.createElement('img');
            img.src = character.imgSrc;
            characterDiv.appendChild(img);
        }

        const nameLabel = document.createElement('div');
        nameLabel.textContent = `Nome: ${character.name}`;
        nameLabel.classList.add('name-label');

        // Vida
        const healthBarContainer = document.createElement('div');
        healthBarContainer.classList.add('bar-container');
        const healthBarLabel = document.createElement('div');
        healthBarLabel.classList.add('bar-label');
        healthBarLabel.textContent = 'Vida';
        const healthBar = document.createElement('div');
        healthBar.classList.add('bar');
        const healthBarValue = document.createElement('div');
        healthBarValue.classList.add('bar-value');
        healthBarValue.style.width = '100%';
        healthBarValue.textContent = character.health;

        healthBar.appendChild(healthBarValue);
        healthBarContainer.appendChild(healthBarLabel);
        healthBarContainer.appendChild(healthBar);

        // Stamina
        const staminaContainer = document.createElement('div');
        staminaContainer.classList.add('stamina-container');
        const staminaLabel = document.createElement('div');
        staminaLabel.classList.add('stamina-label');
        staminaLabel.textContent = 'Stamina';
        const staminaBar = document.createElement('div');
        staminaBar.classList.add('stamina-bar');
        const staminaBarValue = document.createElement('div');
        staminaBarValue.classList.add('stamina-bar-value');
        staminaBarValue.style.width = '100%';
        staminaBarValue.textContent = character.stamina;

        staminaBar.appendChild(staminaBarValue);
        staminaContainer.appendChild(staminaLabel);
        staminaContainer.appendChild(staminaBar);

        // Valor e Botões
        const valueInput = document.createElement('input');
        valueInput.type = 'number';
        valueInput.placeholder = 'Valor';

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        const applyHealthButton = document.createElement('button');
        applyHealthButton.textContent = 'Reduzir Vida';
        applyHealthButton.onclick = () => {
            const value = parseInt(valueInput.value) || 0;
            const currentHealth = parseInt(healthBarValue.textContent);
            const newHealth = Math.max(0, currentHealth - value);
            const healthPercentage = (newHealth / character.health) * 100;
            healthBarValue.style.width = healthPercentage + '%';
            healthBarValue.textContent = newHealth;
            saveCharacters(); // Salva após alteração
        };

        const applyStaminaButton = document.createElement('button');
        applyStaminaButton.textContent = 'Reduzir Stamina';
        applyStaminaButton.onclick = () => {
            const value = parseInt(valueInput.value) || 0;
            const currentStamina = parseInt(staminaBarValue.textContent);
            const newStamina = Math.max(0, currentStamina - value);
            const staminaPercentage = (newStamina / character.stamina) * 100;
            staminaBarValue.style.width = staminaPercentage + '%';
            staminaBarValue.textContent = newStamina;
            saveCharacters(); // Salva após alteração
        };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => {
            container.removeChild(characterDiv);
            saveCharacters(); // Salva após remoção
        };

        buttonsContainer.appendChild(applyHealthButton);
        buttonsContainer.appendChild(applyStaminaButton);
        buttonsContainer.appendChild(removeButton);

        characterDiv.appendChild(nameLabel);
        characterDiv.appendChild(healthBarContainer);
        characterDiv.appendChild(staminaContainer);
        characterDiv.appendChild(valueInput);
        characterDiv.appendChild(buttonsContainer);

        container.appendChild(characterDiv);
    });
}

function openCharacterModal() {
    document.getElementById('characterModal').style.display = 'flex';
}

function closeCharacterModal() {
    document.getElementById('characterModal').style.display = 'none';
}

function addCharacter() {
    const container = document.getElementById('characters-container');

    const name = document.getElementById('nameInput').value;
    const maxHealth = parseInt(document.getElementById('healthInput').value) || 100;
    const maxStamina = parseInt(document.getElementById('staminaInput').value) || 100;
    const photoFile = document.getElementById('photoInput').files[0];

    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character');

    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            characterDiv.appendChild(img);
        };
        reader.readAsDataURL(photoFile);
    }

    const nameLabel = document.createElement('div');
    nameLabel.textContent = `Nome: ${name}`;
    nameLabel.classList.add('name-label');

    // Vida
    const healthBarContainer = document.createElement('div');
    healthBarContainer.classList.add('bar-container');
    const healthBarLabel = document.createElement('div');
    healthBarLabel.classList.add('bar-label');
    healthBarLabel.textContent = 'Vida';
    const healthBar = document.createElement('div');
    healthBar.classList.add('bar');
    const healthBarValue = document.createElement('div');
    healthBarValue.classList.add('bar-value');
    healthBarValue.style.width = '100%';
    healthBarValue.textContent = maxHealth;

    healthBar.appendChild(healthBarValue);
    healthBarContainer.appendChild(healthBarLabel);
    healthBarContainer.appendChild(healthBar);

    // Stamina
    const staminaContainer = document.createElement('div');
    staminaContainer.classList.add('stamina-container');
    const staminaLabel = document.createElement('div');
    staminaLabel.classList.add('stamina-label');
    staminaLabel.textContent = 'Stamina';
    const staminaBar = document.createElement('div');
    staminaBar.classList.add('stamina-bar');
    const staminaBarValue = document.createElement('div');
    staminaBarValue.classList.add('stamina-bar-value');
    staminaBarValue.style.width = '100%';
    staminaBarValue.textContent = maxStamina;

    staminaBar.appendChild(staminaBarValue);
    staminaContainer.appendChild(staminaLabel);
    staminaContainer.appendChild(staminaBar);

    // Valor e Botões
    const valueInput = document.createElement('input');
    valueInput.type = 'number';
    valueInput.placeholder = 'Valor';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const applyHealthButton = document.createElement('button');
    applyHealthButton.textContent = 'Reduzir Vida';
    applyHealthButton.onclick = () => {
        const value = parseInt(valueInput.value) || 0;
        const currentHealth = parseInt(healthBarValue.textContent);
        const newHealth = Math.max(0, currentHealth - value);
        const healthPercentage = (newHealth / maxHealth) * 100;
        healthBarValue.style.width = healthPercentage + '%';
        healthBarValue.textContent = newHealth;
        saveCharacters(); // Salva após alteração
    };

    const applyStaminaButton = document.createElement('button');
    applyStaminaButton.textContent = 'Reduzir Stamina';
    applyStaminaButton.onclick = () => {
        const value = parseInt(valueInput.value) || 0;
        const currentStamina = parseInt(staminaBarValue.textContent);
        const newStamina = Math.max(0, currentStamina - value);
        const staminaPercentage = (newStamina / maxStamina) * 100;
        staminaBarValue.style.width = staminaPercentage + '%';
        staminaBarValue.textContent = newStamina;
        saveCharacters(); // Salva após alteração
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
        container.removeChild(characterDiv);
        saveCharacters(); // Salva após remoção
    };

    buttonsContainer.appendChild(applyHealthButton);
    buttonsContainer.appendChild(applyStaminaButton);
    buttonsContainer.appendChild(removeButton);

    characterDiv.appendChild(nameLabel);
    characterDiv.appendChild(healthBarContainer);
    characterDiv.appendChild(staminaContainer);
    characterDiv.appendChild(valueInput);
    characterDiv.appendChild(buttonsContainer);

    container.appendChild(characterDiv);
    saveCharacters(); // Salva após adicionar
    closeCharacterModal();
}

function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
}

// Carregar personagens ao iniciar a página
window.onload = function() {
    loadCharacters();
};
