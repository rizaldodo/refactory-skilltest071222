// const readline = require('node:readline');
// const { stdin: input, stdout: output } = require('node:process');

// const rl = readline.createInterface({ input, output });
// console.log(rl);
'use strict'

const { resolve } = require('path');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let inputResto, inputCashier, inputDate
let itemList = []
let isExit = false
let total = 0

const resto = () => {
  return new Promise((resolve, reject) => {
    rl.question('Masukkan Nama Resto:  ', (answer) => {
        inputResto = answer
      resolve()
    })
  })
}

const cashier = () => {
  return new Promise((resolve, reject) => {
    rl.question('Masukkan Nama Kasir: ', (answer) => {
        inputCashier = answer
      resolve()
    })
  })
}


const date = () => {
  return new Promise((resolve, reject) => {
    rl.question('Masukkan Tanggal: ', (answer) => {
        inputDate = answer
      resolve()
    })
  })
}

const items = () => {
    return new Promise((resolve,reject) => {
        rl.question('Masukkan nama item: ', (itemName) => {
            if(itemName.toLowerCase().trim()=='exit'){
                isExit = true
                rl.close()
                resolve()
            }else{
                rl.question('Masukkan harga: ', (itemPrice) => {
                    itemList.push([itemName,itemPrice])
                    resolve()
                })

            }
        })
    })
}

const formatRestoName = () => {
    let num = 30 - inputResto.length
    let space = ''
    for (let i=0; i<Math.floor(num/2); i++){
        space+=' '
    }
    return space+=inputResto
}

// const formatDateLine = () => {
//     let str = 'Nama Kasir : '
//     let int = 30 - (str.length - inputDate.length)
//     let spaceChar = ''

//     for(let i=0; i<int; i++){
//         spaceChar+=' ' 
//     }

//     return str+spaceChar+inputDate

// }

const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }
// const dotSeparator = () => {
//     let dot = ''
//     for(let i=0; i<10; i++){
//         dot+='.'
//     }
//     return dot
// }  
const printDetailItem = (items) => {
    for(let item of items){
        total += parseInt(item[1])
        let newRupiah = rupiah(item[1])
        console.log(`${item[0]}..........${newRupiah}`)
    }
}


const output = () => {
    let separator = () => {
        let str = ""
        for(let i=0; i<30; i++){
            str+='='
        }
        return str
    }

    console.log('\n')
    console.log(separator())
    console.log(separator())
    console.log(formatRestoName())
    console.log(`Tanggal : ${inputDate}`)
    console.log(`Nama Kasir : ${inputCashier}`)
    console.log(separator())
    printDetailItem(itemList)
    console.log(`Total.......${rupiah(total)}`)
    
}

const main = async () => {
    await resto()
    await date()
    await cashier()
    while(!isExit){
        await items()
    }
//   console.log(itemList)
  output()

  rl.close()
}

main()

