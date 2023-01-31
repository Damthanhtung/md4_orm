showHome()
function showList() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/products",
        headers: {
            'Content-Type': 'application/json',
        },
        success : (products) => {
            let html = ''
            console.log(products)
            products.map(item => {
                html += `<tr>
                             <td>${item.id}</td>
                             <td>${item.name}</td>
                             <td>${item.price}</td>
                             <td><img src="${item.image}" style="height: 50px"></td> 
                             <td>${item.nameCategory}</td>
                             <td><button onclick="remove(${item.id})">Delete</button></td>
                             <td><button onclick="showFormEdit(${item.id})">Edit</button></td>
                         </tr>`
            })
            $("#tbody").html(html)
        }
    })
}
function showFormAdd() {
    $("#body").html(`
<input type="text" id="name" placeholder="name">
<input type="text" id="price" placeholder="price">
<input type="file" id="image" onchange="uploadImage(event)" placeholder="image">
<input type="text" id="category" placeholder="category">


<button onclick="add()">Add</button>
<div id="imgDiv"></div>
`)
}
function showHome() {
    $("#body").html(`
    <table border="1">
    <thead>
    <tr>
        <td>id</td>
        <td>name</td>
        <td>price</td>
        <td>image</td>
        <td>category</td>
        
        <td colspan="2">Action</td>
    </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
   </table>
    `)
    showList()
}
function add() {
    let name = $("#name").val();
    let price = $("#price").val();
    let image = localStorage.getItem('image');
    let category = $("#category").val();

    let product = {
        name: name,
        image: image,
        price: price,
        category: category
    }
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/products",
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
        success : () => {
            showHome()
        }
    })
}
function showFormEdit(id) {

        $("#body").html(`
            <input type="text" id="name" placeholder="name" >
            <input type="text" id="price" placeholder="price">
            <input type="file" id="image" onchange="uploadImageEdit(event,${id})" placeholder="image">
            <input type="text" id="category" placeholder="category">
            
            <button onclick="edit('${id}')">Edit</button>
            <div id="imgDiv"></div>
`)

}
function edit(id) {
    let name = $("#name").val();
    let price = $("#price").val();
    let image = localStorage.getItem('image');
    let category = $("#category").val();

    let product = {
        name: name,
        image: image,
        price: price,
        category: category
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
        success : () => {
            showHome()
        }
    })
}
function remove(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        success : () => {
            showHome()
        }
    })
}
function uploadImage(e) {
    let fbBucketName = 'images';
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="">`
            localStorage.setItem('image', downloadURL);
        });
}
function uploadImageEdit(e, id) {
    let fbBucketName = 'images';
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById(`imgDiv`).innerHTML = `<img src="${downloadURL}" alt="${downloadURL}"  style="width: 500px;">`
            localStorage.setItem('image', downloadURL);
        });
}

