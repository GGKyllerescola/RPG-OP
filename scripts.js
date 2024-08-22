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
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
        container.removeChild(characterDiv);
    };

    buttonsContainer.appendChild(applyHealthButton);
    buttonsContainer.appendChild(applyStaminaButton);

    characterDiv.appendChild(nameLabel);
    characterDiv.appendChild(healthBarContainer);
    characterDiv.appendChild(staminaContainer);
    characterDiv.appendChild(valueInput);
    characterDiv.appendChild(buttonsContainer);
    characterDiv.appendChild(removeButton);

    container.appendChild(characterDiv);
    closeCharacterModal();
}

function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
}
