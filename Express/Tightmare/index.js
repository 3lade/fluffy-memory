// //CallBack Hell

// function getData(dataId, cb)
// {
//         setTimeout(() => {
//             console.log("data: ", dataId);
//             cb();
//         },1000)
// }

// console.log("Getting data 1......");
// getData(1, () => {
//   console.log("Getting data 2.....");
//   getData(2, () => {
//       console.log("Getting data 3.....");
//       getData(3, () => {
//           console.log("Getting data 4.....");
//           getData(4, () => {
//               console.log("All data received.");
//           });
//       });
//   });
// });


// //Using Promises
// function getData(userId)
// {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("data:",userId);
//             resolve("success");
//         }, 1000)
//     })
// }

// console.log("Getting data 1...")
// getData(1)
// .then(() => {
//     console.log("Getting data 2...")
//     return getData(2)
// })
// .then(() => {
//     console.log("Getting data 3...")
//     return getData(3)
// })
// .then(() => {
//     console.log("Getting data 4...")
//     return getData(4)
//     console.log("Retreived all data.")
// })



//Using async/await
function getData(dataId)
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log("data:", dataId);
        resolve("success");
    }, 1000)
    })
}

async function gettingData()
{
    console.log("Getting data 1.....")
    await getData(1);
    console.log("Getting data 2.....")
    await getData(2);
    console.log("Getting data 3.....")
    await getData(3);
    console.log("Getting data 4.....")
    await getData(4);
    console.log("Getting data 4.....")
}

gettingData();