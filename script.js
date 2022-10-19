let c = (elemento) => {
    return document.querySelector(elemento) 
}
let cs = (elemento) => {
    return document.querySelectorAll(elemento) 
}
let cart = [] 
let modalKey = 0 
let modalQt = 1 

pizzaJson.map((item,index)=>{ 

    let pizzasItem = document.querySelector('.models .pizza-item').cloneNode(true) 
    document.querySelector('.pizza-area').append(pizzasItem) 

    pizzasItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}` 
    pizzasItem.querySelector('.pizza-item--name').innerHTML = item.name 
    pizzasItem.querySelector('.pizza-item--desc').innerHTML = item.description 
    pizzasItem.querySelector('.pizza-item--img img').src = item.img 

    pizzasItem.querySelector('a').addEventListener('click', (e)=>{ 

        e.preventDefault() 
        c('.pizzaWindowArea').style.display = 'flex'
        modalQt = 1 
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt 
        
        pizzasItem.setAttribute('data-key', index) 
        let key = e.target.closest('.pizza-item').getAttribute('data-key') 
        
        modalKey = key

        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name 
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description 
        c('.pizzaBig img').src = pizzaJson[key].img 
        c('.pizzaInfo--actualPrice').innerHTML = 'R$ ' + pizzaJson[key].price.toFixed(2) 

        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')

        cs('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=> { 
         sizeItem.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex] 
         if (sizeIndex == 2) { 
            sizeItem.classList.add('selected')
        }
        })
    })
})

function sairModal() {
    c('.pizzaWindowArea').style.display = 'none'
}
    document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((fechar)=>{
    fechar.addEventListener('click', sairModal) 
})

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click',()=> { 
    if (modalQt > 1) { 
        modalQt-- 
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt 
    }
    
})

document.querySelector('.pizzaInfo--qtmais').addEventListener('click',()=> { 
    modalQt++ 
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt 
})

document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, index)=> { 

    sizeItem.addEventListener('click', ()=>{ 
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected') 
        sizeItem.classList.add('selected') 
    })
})

document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=>{ 
    
    let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'))
    let identifier = pizzaJson[modalKey].id + '@' + size 
    let key = cart.findIndex((item)=> 
        item.identifier == identifier) 

    if(key > -1) {
     cart[key].qt += modalQt

    } else {

   cart.push({ 
        identifier, 
        id: pizzaJson[modalKey].id, 
        size, 
        qt: modalQt 
    })
}
 updateCart() 
 sairModal() 
})

function updateCart(){ 
    
    c('.menu-openner span').innerHTML = cart.length 

    if(cart.length > 0){
        c('aside').classList.add('show') 
        c('.cart').innerHTML =  '' 

       let subtotal = 0 
       let desconto = 0
       let total = 0

            for (let i in cart){ 

                let pizzaItem = pizzaJson.find((item)=>{ 
                    return item.id == cart[i].id 
                   })  
                   let cartItem = c('.cart--item').cloneNode(true)
                   c('.cart').append(cartItem)

                    subtotal += pizzaItem.price * cart[i].qt 
                   
                   cartItem.querySelector('.cart--item-nome').innerHTML = pizzaItem.name
                   cartItem.querySelector('img').src = pizzaItem.img 
                   cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt 
                   cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                        cart[i].qt++
                        updateCart()
                })

                cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                    if (cart[i].qt > 1) {
                        cart[i].qt--
                    }else { 
                        cart.splice(i,1) 
                    }
                     updateCart()
                })

                  if(cart[i].size == 2) {
                    cartItem.querySelector('.cart--item-nome').innerHTML += '<strong> (G)</strong>' 
                  }else if (cart[i].size == 1) {
                    cartItem.querySelector('.cart--item-nome').innerHTML += '<strong> (M)</strong>'
                  }else {
                    cartItem.querySelector('.cart--item-nome').innerHTML += '<strong> (P)</strong>'
                  }
            }

            desconto = subtotal * 0.1
            total = subtotal - desconto
    
            c('.subtotal span:last-child').innerHTML = `<strong> R$ ${subtotal.toFixed(2)}</strong>`
            c('.desconto span:last-child').innerHTML = `<strong> R$ ${desconto.toFixed(2)}</strong>`
            c('.total span:last-child').innerHTML = `<strong> R$ ${total.toFixed(2)}</strong>`
    
        }else{
            c('aside').classList.remove('show')
            c('aside').style.left = '100vw'
        }
    }

    c('.menu-openner').addEventListener('click',()=>{
        if(cart.length > 0){
            c('aside').style.left = '0vw'
        }  
    })

    c('.menu-closer').addEventListener('click',()=>{
         c('aside').style.left = '100vw'
    })
    
    