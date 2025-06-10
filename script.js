// Banco de dados local
const db = {
  users: [],
  services: [],
  demands: [],
};

// Elementos do formulário
const userForm = document.getElementById("userForm");
const serviceForm = document.getElementById("serviceForm");
const demandForm = document.getElementById("demandForm");

// Tabelas
const usersTable = document.getElementById("usersTable").querySelector("tbody");
const servicesTable = document
  .getElementById("servicesTable")
  .querySelector("tbody");
const demandsTable = document
  .getElementById("demandsTable")
  .querySelector("tbody");

// Seletores de usuário
const serviceUserSelect = document.getElementById("serviceUser");
const demandUserSelect = document.getElementById("demandUser");

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  updateUserSelects();
  updateTables();
});

// Funções para abas
function openTab(tabId) {
  // Esconde todos os conteúdos de abas
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove a classe 'active' de todas as abas
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Mostra a aba atual e marca como ativa
  document.getElementById(tabId).classList.add("active");
  event.currentTarget.classList.add("active");

  // Se for a aba de listagens, atualiza as tabelas
  if (tabId === "listTab") {
    updateTables();
  }
}

// Cadastro de usuário
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newUser = {
    id: Date.now(), // ID simples baseado no timestamp
    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value,
    phone: document.getElementById("userPhone").value,
    type: document.getElementById("userType").value,
    skills: document
      .getElementById("userSkills")
      .value.split(",")
      .map((skill) => skill.trim()),
    createdAt: new Date(),
  };

  db.users.push(newUser);
  alert("Usuário cadastrado com sucesso!");
  userForm.reset();
  updateUserSelects();
});

// Cadastro de serviço
serviceForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = parseInt(serviceUserSelect.value);
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    alert("Usuário não encontrado!");
    return;
  }

  const newService = {
    id: Date.now(),
    userId: userId,
    userName: user.name,
    category: document.getElementById("serviceCategory").value,
    description: document.getElementById("serviceDescription").value,
    value: parseFloat(document.getElementById("serviceValue").value) || 0,
    location: document.getElementById("serviceLocation").value,
    createdAt: new Date(),
  };

  db.services.push(newService);
  alert("Serviço cadastrado com sucesso!");
  serviceForm.reset();
});

// Cadastro de demanda
demandForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = parseInt(demandUserSelect.value);
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    alert("Usuário não encontrado!");
    return;
  }

  const newDemand = {
    id: Date.now(),
    userId: userId,
    userName: user.name,
    category: document.getElementById("demandCategory").value,
    description: document.getElementById("demandDescription").value,
    budget: parseFloat(document.getElementById("demandBudget").value) || 0,
    location: document.getElementById("demandLocation").value,
    deadline: document.getElementById("demandDeadline").value,
    createdAt: new Date(),
  };

  db.demands.push(newDemand);
  alert("Demanda cadastrada com sucesso!");
  demandForm.reset();
});

// Atualiza os selects de usuário
function updateUserSelects() {
  // Limpa os selects
  serviceUserSelect.innerHTML =
    '<option value="">Selecione um usuário</option>';
  demandUserSelect.innerHTML = '<option value="">Selecione um usuário</option>';

  // Adiciona os usuários
  db.users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = `${user.name} (${user.email})`;

    serviceUserSelect.appendChild(option.cloneNode(true));
    demandUserSelect.appendChild(option);
  });
}

// Atualiza as tabelas
function updateTables() {
  // Limpa as tabelas
  usersTable.innerHTML = "";
  servicesTable.innerHTML = "";
  demandsTable.innerHTML = "";

  // Preenche a tabela de usuários
  db.users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${getUserTypeLabel(user.type)}</td>
            <td>${user.skills.join(", ")}</td>
        `;
    usersTable.appendChild(row);
  });

  // Preenche a tabela de serviços
  db.services.forEach((service) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${service.userName}</td>
            <td>${service.category}</td>
            <td>${service.description}</td>
            <td>R$ ${service.value.toFixed(2)}</td>
            <td>${service.location}</td>
        `;
    servicesTable.appendChild(row);
  });

  // Preenche a tabela de demandas
  db.demands.forEach((demand) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${demand.userName}</td>
            <td>${demand.category}</td>
            <td>${demand.description}</td>
            <td>R$ ${demand.budget.toFixed(2)}</td>
            <td>${demand.location}</td>
            <td>${demand.deadline || "Não especificado"}</td>
        `;
    demandsTable.appendChild(row);
  });
}

// Retorna o label do tipo de usuário
function getUserTypeLabel(type) {
  const types = {
    professional: "Profissional",
    client: "Cliente",
    both: "Profissional e Cliente",
  };
  return types[type] || type;
}
