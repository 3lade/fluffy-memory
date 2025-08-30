document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const form = document.getElementById('regForm');
  const tbody = document.getElementById('usersTableBody');
  const tableSection = document.getElementById('tableSection');
  const contentWrapper = document.getElementById('contentWrapper');

  // Toasts
  const successToast = new bootstrap.Toast(document.getElementById('successToast'), { autohide: true, delay: 2500 });
  const errorToast = new bootstrap.Toast(document.getElementById('errorToast'), { autohide: true, delay: 2500 });
  const deletedToast = new bootstrap.Toast(document.getElementById('deletedToast'), { autohide: true, delay: 2000 });

  // Modal
  const confirmModalEl = document.getElementById('confirmDeleteModal');
  const confirmModal = new bootstrap.Modal(confirmModalEl);
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

  // Inputs
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const passwordEl = document.getElementById('password');
  const confirmPasswordEl = document.getElementById('confirmPassword');
  const ageEl = document.getElementById('age');
  const phoneEl = document.getElementById('phone');
  const genderFeedback = document.getElementById('genderFeedback');

  let rowToDelete = null;

  // Helpers
  function getSelectedGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    return selected ? selected.value : '';
  }

  function validatePassword() {
    const value = passwordEl.value || '';
    // At least 8 chars, one uppercase, one lowercase, one number, one special
    const strong = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!strong.test(value)) {
      passwordEl.setCustomValidity('weak');
      return false;
    }
    passwordEl.setCustomValidity('');
    return true;
  }

  function validateConfirmPassword() {
    if (confirmPasswordEl.value !== passwordEl.value) {
      confirmPasswordEl.setCustomValidity('mismatch');
      return false;
    }
    confirmPasswordEl.setCustomValidity('');
    return true;
  }

  function validateGender() {
    const hasGender = !!getSelectedGender();
    if (!hasGender) {
      genderFeedback.classList.remove('visually-hidden');
    } else {
      genderFeedback.classList.add('visually-hidden');
    }
    return hasGender;
  }

  function sanitize(text) {
    return (text || '').toString().trim();
  }

  function addRow({ name, email, phone, age, gender }) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th></th>
      <td>${name}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${age}</td>
      <td>${gender}</td>
      <td><button type="button" class="btn btn-sm btn-danger delete-btn">Delete</button></td>
    `;
    tbody.appendChild(tr);
    renumberRows();
    tableSection.classList.remove('d-none');
  }

  function renumberRows() {
    [...tbody.querySelectorAll('tr')].forEach((tr, idx) => {
      const th = tr.querySelector('th');
      if (th) th.textContent = String(idx + 1);
    });
    if (!tbody.querySelector('tr')) {
      tableSection.classList.add('d-none');
    }
  }

  function resetForm() {
    form.reset();
    form.classList.remove('was-validated');
    genderFeedback.classList.add('visually-hidden');
    passwordEl.setCustomValidity('');
    confirmPasswordEl.setCustomValidity('');
  }

  // Live validation
  passwordEl.addEventListener('input', () => {
    validatePassword();
    validateConfirmPassword();
  });

  confirmPasswordEl.addEventListener('input', () => {
    validateConfirmPassword();
  });

  document.getElementById('genderGroup').addEventListener('change', () => {
    validateGender();
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const passOk = validatePassword();
    const confirmOk = validateConfirmPassword();
    const genderOk = validateGender();

    if (form.checkValidity() && passOk && confirmOk && genderOk) {
      const payload = {
        name: sanitize(nameEl.value),
        email: sanitize(emailEl.value),
        phone: sanitize(phoneEl.value),
        age: sanitize(ageEl.value),
        gender: getSelectedGender()
      };
      addRow(payload);
      successToast.show();
      resetForm();
    } else {
      form.classList.add('was-validated');
      errorToast.show();
    }
  });

  // Delete flow (event delegation)
  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;
    rowToDelete = btn.closest('tr');
    confirmModal.show();
  });

  confirmDeleteBtn.addEventListener('click', () => {
    if (rowToDelete) {
      rowToDelete.remove();
      rowToDelete = null;
      renumberRows();document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const form = document.getElementById('regForm');
  const tbody = document.getElementById('usersTableBody');
  const tableSection = document.getElementById('tableSection');
  const contentWrapper = document.getElementById('contentWrapper');

  // Toasts
  const successToast = new bootstrap.Toast(document.getElementById('successToast'), { autohide: true, delay: 2500 });
  const errorToast = new bootstrap.Toast(document.getElementById('errorToast'), { autohide: true, delay: 2500 });
  const deletedToast = new bootstrap.Toast(document.getElementById('deletedToast'), { autohide: true, delay: 2000 });
  const agreementToast = new bootstrap.Toast(document.getElementById('agreementToast'), { autohide: true, delay: 2500 });

  // Modal
  const confirmModalEl = document.getElementById('confirmDeleteModal');
  const confirmModal = new bootstrap.Modal(confirmModalEl);
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

  // Inputs
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const passwordEl = document.getElementById('password');
  const confirmPasswordEl = document.getElementById('confirmPassword');
  const ageEl = document.getElementById('age');
  const phoneEl = document.getElementById('phone');
  const genderFeedback = document.getElementById('genderFeedback');
  const agreeTermsEl = document.getElementById('agreeTerms');
  const agreePrivacyEl = document.getElementById('agreePrivacy');

  let rowToDelete = null;

  // Helpers
  function getSelectedGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    return selected ? selected.value : '';
  }

  function validatePassword() {
    const value = passwordEl.value || '';
    // At least 8 chars, one uppercase, one lowercase, one number, one special
    const strong = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!strong.test(value)) {
      passwordEl.setCustomValidity('Password must be 8+ chars with uppercase, lowercase, number, and special.');
      return false;
    }
    passwordEl.setCustomValidity('');
    return true;
  }

  function validateConfirmPassword() {
    if (confirmPasswordEl.value !== passwordEl.value) {
      confirmPasswordEl.setCustomValidity('Passwords do not match.');
      return false;
    }
    confirmPasswordEl.setCustomValidity('');
    return true;
  }

  function validateGender() {
    const hasGender = !!getSelectedGender();
    if (!hasGender) {
      genderFeedback.classList.remove('visually-hidden');
    } else {
      genderFeedback.classList.add('visually-hidden');
    }
    return hasGender;
  }

  function validateAgreements() {
    const t = !!agreeTermsEl.checked;
    const p = !!agreePrivacyEl.checked;

    agreeTermsEl.setCustomValidity(t ? '' : 'required');
    agreePrivacyEl.setCustomValidity(p ? '' : 'required');

    return t && p;
  }

  function sanitize(text) {
    return (text || '').toString().trim();
  }

  function addRow({ name, email, phone, age, gender }) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'row';

    const tdName = document.createElement('td');
    const tdEmail = document.createElement('td');
    const tdPhone = document.createElement('td');
    const tdAge = document.createElement('td');
    const tdGender = document.createElement('td');
    const tdActions = document.createElement('td');

    tdName.textContent = name;
    tdEmail.textContent = email;
    tdPhone.textContent = phone;
    tdAge.textContent = age;
    tdGender.textContent = gender;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-sm btn-danger delete-btn';
    btn.textContent = 'Delete';

    tdActions.appendChild(btn);
    tr.append(th, tdName, tdEmail, tdPhone, tdAge, tdGender, tdActions);
    tbody.appendChild(tr);

    renumberRows();
    tableSection.classList.remove('d-none');
  }

  function renumberRows() {
    [...tbody.querySelectorAll('tr')].forEach((tr, idx) => {
      const th = tr.querySelector('th');
      if (th) th.textContent = String(idx + 1);
    });
    if (!tbody.querySelector('tr')) {
      tableSection.classList.add('d-none');
    }
  }

  function resetForm() {
    form.reset();
    form.classList.remove('was-validated');
    genderFeedback.classList.add('visually-hidden');
    passwordEl.setCustomValidity('');
    confirmPasswordEl.setCustomValidity('');
    agreeTermsEl.setCustomValidity('');
    agreePrivacyEl.setCustomValidity('');
  }

  // Live validation
  passwordEl.addEventListener('input', () => {
    validatePassword();
    validateConfirmPassword();
  });

  confirmPasswordEl.addEventListener('input', () => {
    validateConfirmPassword();
  });

  document.getElementById('genderGroup').addEventListener('change', () => {
    validateGender();
  });

  agreeTermsEl.addEventListener('change', () => {
    agreeTermsEl.setCustomValidity(agreeTermsEl.checked ? '' : 'required');
  });

  agreePrivacyEl.addEventListener('change', () => {
    agreePrivacyEl.setCustomValidity(agreePrivacyEl.checked ? '' : 'required');
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const passOk = validatePassword();
    const confirmOk = validateConfirmPassword();
    const genderOk = validateGender();
    const agreementsOk = validateAgreements();

    if (form.checkValidity() && passOk && confirmOk && genderOk && agreementsOk) {
      const payload = {
        name: sanitize(nameEl.value),
        email: sanitize(emailEl.value),
        phone: sanitize(phoneEl.value),
        age: sanitize(ageEl.value),
        gender: getSelectedGender()
      };
      addRow(payload);
      successToast.show();
      resetForm();
    } else {
      form.classList.add('was-validated');
      if (!agreementsOk) {
        agreementToast.show();
      }
      errorToast.show();
    }
  });

  // Delete flow (event delegation)
  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;
    rowToDelete = btn.closest('tr');
    confirmModal.show();
  });

  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (rowToDelete) {
      rowToDelete.remove();
      rowToDelete = null;
      renumberRows();
      confirmModal.hide();
      deletedToast.show();
    }
  });

  // Optional: blur background when modal opens
  confirmModalEl.addEventListener('show.bs.modal', () => contentWrapper.classList.add('blurred'));
  confirmModalEl.addEventListener('hidden.bs.modal', () => contentWrapper.classList.remove('blurred'));
});
      confirmModal.hide();
      deletedToast.show();
    }
  });

  // Optional: blur background when modal opens
  confirmModalEl.addEventListener('show.bs.modal', () => contentWrapper.classList.add('blurred'));
  confirmModalEl.addEventListener('hidden.bs.modal', () => contentWrapper.classList.remove('blurred'));
});