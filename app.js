const sidebar = document.querySelector('#sidebar');
const overlay = document.querySelector('#overlay');
const toast = new bootstrap.Toast(document.querySelector('#live-toast'));
const showToast = (message) => { document.querySelector('#toast-message').textContent = message; toast.show(); };

const loginScreen = document.querySelector('#login-screen');
const adminLayout = document.querySelector('#admin-layout');
document.querySelector('#login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector('#login-message');
  if (!form.checkValidity()) { form.classList.add('was-validated'); message.textContent = 'Enter a valid email and password.'; return; }
  loginScreen.classList.add('hidden');
  adminLayout.classList.remove('hidden');
  message.textContent = '';
});
document.querySelector('#forgot-password').addEventListener('click', () => { document.querySelector('#login-message').textContent = 'Password reset instructions would be sent to your email.'; });

function closeMenu() { sidebar.classList.remove('open'); overlay.classList.remove('show'); }
document.querySelector('#menu-button').addEventListener('click', () => { sidebar.classList.add('open'); overlay.classList.add('show'); });
overlay.addEventListener('click', closeMenu);

document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
  link.classList.add('active');
  closeMenu();
}));

function addRow(formId, tableId, row, message, countId) {
  const form = document.querySelector(`#${formId}`);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
    document.querySelector(`#${tableId}`).insertAdjacentHTML('afterbegin', row());
    if (countId) document.querySelector(`#${countId}`).textContent = Number(document.querySelector(`#${countId}`).textContent) + 1;
    bootstrap.Modal.getInstance(form.closest('.modal')).hide();
    form.reset();
    showToast(message);
  });
}

addRow('farmer-form', 'farmer-table', () => `<tr><td><strong>${document.querySelector('#farmer-name').value}</strong></td><td>${document.querySelector('#farmer-email').value}</td><td>27 Aug 2026</td><td><span class="status active-status">Active</span></td></tr>`, 'Farmer added successfully.', 'farmer-count');
addRow('crop-form', 'crop-table', () => `<tr><td><strong>${document.querySelector('#crop-name').value}</strong></td><td><span class="season">${document.querySelector('#crop-season').value}</span></td><td>${document.querySelector('#crop-soil').value}</td><td><button class="edit-crop" data-crop="${document.querySelector('#crop-name').value}" data-season="${document.querySelector('#crop-season').value}" data-soil="${document.querySelector('#crop-soil').value}" type="button"><i class="bi bi-pencil-square"></i>Edit</button></td></tr>`, 'Crop added successfully.', 'crop-count');
addRow('fertilizer-form', 'fertilizer-table', () => `<tr><td><strong>${document.querySelector('#fertilizer-name').value}</strong></td><td>${document.querySelector('#fertilizer-type').value}</td><td>${document.querySelector('#fertilizer-quantity').value}</td></tr>`, 'Fertilizer added successfully.');

document.querySelectorAll('.view-all, #all-farmers').forEach((button) => button.addEventListener('click', () => showToast('Showing all available records.')));
['logout-button', 'logout-top'].forEach((id) => document.querySelector(`#${id}`).addEventListener('click', () => { adminLayout.classList.add('hidden'); loginScreen.classList.remove('hidden'); document.querySelector('#login-form').reset(); showToast('You have been safely logged out.'); }));

function bindCropEdit(button) {
  button.addEventListener('click', () => {
    document.querySelector('#edit-crop-name').value = button.dataset.crop;
    document.querySelector('#edit-crop-season').value = button.dataset.season;
    document.querySelector('#edit-crop-soil').value = button.dataset.soil;
    document.querySelector('#edit-crop-form').dataset.row = button.closest('tr').rowIndex;
    bootstrap.Modal.getOrCreateInstance(document.querySelector('#editCropModal')).show();
  });
}
document.querySelectorAll('.edit-crop').forEach(bindCropEdit);
document.querySelector('#edit-crop-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const row = [...document.querySelectorAll('#crop-table tr')].find((item) => item.rowIndex === Number(event.currentTarget.dataset.row));
  if (!row) return;
  row.children[0].innerHTML = `<strong>${document.querySelector('#edit-crop-name').value}</strong>`;
  row.children[1].innerHTML = `<span class="season">${document.querySelector('#edit-crop-season').value}</span>`;
  row.children[2].textContent = document.querySelector('#edit-crop-soil').value;
  const button = row.querySelector('.edit-crop');
  button.dataset.crop = document.querySelector('#edit-crop-name').value;
  button.dataset.season = document.querySelector('#edit-crop-season').value;
  button.dataset.soil = document.querySelector('#edit-crop-soil').value;
  bootstrap.Modal.getInstance(document.querySelector('#editCropModal')).hide();
  showToast('Crop information updated successfully.');
});
