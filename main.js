let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
// let mood 3lshan a5le crate mood ,update mood>>>
let mood = 'create'
let tmb

// get total i need total when put any dis and  taxes...

function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result
        total.style.background = '#040'
    }else{
        total.innerHTML =''
        total.style.background = '#a00d02'
    }
}


// create prodact
// i need save data becous i put data 'create '
let datapro
if(localStorage.prduct != null){
    datapro = JSON.parse(localStorage.prduct)
}else{
    datapro = []
}


submit.onclick = function (){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(mood === 'create'){
        if(newPro.count>1){
            for(let i = 0; i< newPro.count; i++)
            datapro.push(newPro)
        }else{
            datapro.push(newPro)
        }
    }else{
        datapro[tmb] = newPro
        mood = 'create'
        submit.innerHTML = 'create'
        count.style.display = 'block'
    }

    // datapro.push(newPro)
    localStorage.setItem('product',  JSON.stringify(datapro))
    cleardata()
    showdata()

}

// clear input

function cleardata(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

// read

function showdata(){
    getTotal()
    let table = ''
    for(let i=0 ; i< datapro.length ; i++){
        table += `<tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML= table
    let btndelete = document.getElementById('deleteall')
    if(datapro.length > 0){
        btndelete.innerHTML = `
        <button onclick="deleteall()">delete all (${datapro.length})</button>` 
    }else{
        btndelete.innerHTML = ''
    }

}

showdata()

// delete

function deletedata(i){
   datapro.splice(i,1)
   localStorage.prduct = JSON.stringify(datapro)
   showdata()
}

function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}

// count



// update


function updatedata(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    getTotal()
    count.style.display ='none'
    category.value = datapro[i].category
    submit.innerHTML = 'update'
    mood = 'update'
    tmb = i
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// search

