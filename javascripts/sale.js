const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];
const products = [
    {
        id: 1,
        nombre_producto:"Mezcla original 200g",
        importe: 500
    },
    {
        id: 2,
        nombre_producto:"Mezcla original 500g",
        importe: 900
    },
    {
        id: 3,
        nombre_producto:"Mezcla especial 200g",
        importe: 700
    },
    {
        id: 4,
        nombre_producto:"Mezcla especial 500g",
        importe: 1.200
    }
];

function add() {
    if(priceElement.value == 0 || numberElement.value == 0){
        window.alert("Debe rellenar todos los campos!");
    }
    else{
        const producto = returnProductByID(parseInt(priceElement.value));
        const number = parseInt(numberElement.value);  

        let purchase = {
            producto: producto,
            number: number
        };
        
        let newPurchase = true;

        purchases.forEach((item) => {  
            if(item.producto.importe === purchase.producto["importe"]) {
                newPurchase = false;
            }
        });

        if(purchases.length < 1 || newPurchase) { 
            purchases.push(purchase);
        }
        else {
            for(let i = 0; i < purchases.length; i++) {
                if(purchases[i].producto.importe === purchase.producto.importe) {
                    purchases[i].number += purchase.number;
                }
            }
        }

        window.alert(`${display()}\nsubtotal ${subtotal()} yenes`);
    }
}

function display() {
    return purchases.map(purchase => {
        return `${purchase.number} de ${purchase.producto.nombre_producto} por ${purchase.producto.importe} Yenes`
    }).join("\n");
  };
  
  function subtotal() {
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.producto.importe * purchase.number 
    }, 0);
  }

function calc() {
    if(purchases.length==0 || (priceElement.value == 0 && numberElement.value == 0)){
        window.alert("Debe rellenar campos!");
    }
    else{
        const postage = calcPostageFromPurchase(subtotal());
        window.alert(`${display()}
                    subtotal ${subtotal()} Yenes
                    Los gastos de envío son ${postage} Yenes. 
                    Total: ${subtotal() + postage} yenes`);
        purchases = [];
        priceElement.value= "";
        numberElement.value = "";
    }    
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 1000){
   return 500;
  } else {
   return 250;
  }
}

function returnProductByID(id_producto){
    for(let i=0; i<products.length; i++){
        if(products[i]["id"] == id_producto){
            return products[i];
        }
        else{ console.log("error");}
    }
}