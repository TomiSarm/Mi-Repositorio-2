




















































































































// const prendas = ["Camisa","Remera","Pantalon","Zapatillas"]
// const colores = ["Amarillo","Azul"]
// function vender(){
//     let prendaElegida = prompt(`Que prenda desea comprar?
// 1:Camisa 2:Remera 3:Pantalon 4:Zapatillas`)
//     if (parseInt(prendaElegida) == 1  || parseInt(prendaElegida) == 2 || parseInt(prendaElegida) == 3 || parseInt(prendaElegida) == 4){
//         if (prendaElegida == 1){
//             prendaElegida = prendas[0]
//         }else if(prendaElegida == 2){
//             prendaElegida = prendas[1]
//         }else if(prendaElegida == 3){
//             prendaElegida = prendas[2]
//         }else if(prendaElegida == 4){
//             prendaElegida = prendas[3]
//         }
//         let colorPrenda = prompt(`Quiere en color Amarillo o Azul?`)
//         if (colorPrenda == "Amarillo"  || colorPrenda == "amarillo" || colorPrenda == "Azul" || colorPrenda == "azul"){
//             alert(`Su compra de ${prendaElegida} en color ${colorPrenda} a sido exitosa `)
//             preguntar()
//             }else{
//                 alert(`No disponemos de ese color`)
//                 preguntar()
//             }
//     }else{
//         alert("No tenemos esa prenda")
//         preguntar()
//     }
// }
// function preguntar(){
//     let SegundaCompra = prompt(`Desea comprar otra vez?
//     1:SI 2:NO`)
//     if (SegundaCompra == 1){
//         vender()
//     }else{
//         alert("Muchas gracias por su compra")
//     } 
// }
// vender();

// let Mica = prompt("Del 1 al 10?") 
// if((Mica==10)){
//     alert("Que lindas que estan las putas")
// }else if (Mica >= 10){
//     alert("Mica esta disponible")
// }

// let presupuesto = prompt("Cual es tu presupuesto?")
// if(presupuesto <= 20){
//     alert("Te puedo ofrecer 2 caramelos")
// }else if((presupuesto >= 21) && (presupuesto <= 49)){
//     alert("Estas cerca, pero no puedo fiarte, vuelve mañana")
// }

// if(presupuesto >= 50){
//     alert("Aquí tienes tus figuritas del mundial")
// }

// let cantidad = parseInt (prompt("Cantidad de repeteciones"))
// let texto = prompt("Ingrese un texto")
// for(let x=0; x<cantidad;x++){
//     console.log(texto);
// }

// function saldudar(nombre){
//     let nombre = prompt ("Como te llamas?");
//     let frase = `Hola ${nombre}!`;
//     document.write(frase)
// }