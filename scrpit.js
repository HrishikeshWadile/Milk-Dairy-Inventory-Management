$(document).ready(function () {
    const inventory = [];

    function renderInventory(filter = '') {
        const inventoryList = $('#inventory-list');
        inventoryList.empty();
        let totalQuantity = 0;

        inventory
            .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach((item, index) => {
                const row = `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-button" data-index="${index}">Edit</button>
                            <button class="btn btn-danger btn-sm delete-button" data-index="${index}">Delete</button>
                        </td>
                    </tr>
                `;
                inventoryList.append(row);
                totalQuantity += item.quantity;
            });

        $('#total-quantity').text(`Total Quantity: ${totalQuantity}`);

        $('.delete-button').click(function () {
            const index = $(this).data('index');
            deleteItem(index);
        });

        $('.edit-button').click(function () {
            const index = $(this).data('index');
            editItem(index);
        });
    }

    function addItem(event) {
        event.preventDefault();
        const itemName = $('#item-name').val().trim();
        const itemQuantity = parseInt($('#item-quantity').val().trim());

        if (itemName && !isNaN(itemQuantity) && itemQuantity > 0) {
            inventory.push({ name: itemName, quantity: itemQuantity });
            $('#item-name').val('');
            $('#item-quantity').val('');
            renderInventory();
        } else {
            alert('Please enter valid item name and quantity.');
        }
    }

    function deleteItem(index) {
        inventory.splice(index, 1);
        renderInventory();
    }

    function editItem(index) {
        const item = inventory[index];
        const newName = prompt('Edit Item Name:', item.name);
        const newQuantity = parseInt(prompt('Edit Quantity:', item.quantity));

        if (newName && !isNaN(newQuantity) && newQuantity > 0) {
            inventory[index] = { name: newName, quantity: newQuantity };
            renderInventory();
        } else {
            alert('Invalid input. Edit canceled.');
        }
    }

    $('#search-bar').on('input', function () {
        renderInventory($(this).val());
    });

    $('#add-item-form').submit(addItem);
    renderInventory();
});