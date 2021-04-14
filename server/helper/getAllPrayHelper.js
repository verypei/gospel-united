// function setDate(day, month){
//     switch(day){
//         case 0 : 
//             day = "sunday";
//             break;
//         case 1 : 
//             day = "monday";
//             break;
//         case 2 : 
//             day = "tuesday";
//             break;
//         case 3 : 
//             day = "wednesday";
//             break;
//         case 4 : 
//             day = "thursday";
//             break;
//         case 5 : 
//             day = "friday";
//             break;
//         case 6 : 
//             day = "saturday";
//             break;
//     }
//     switch(month){
//         case 0 : 
//             month = "january";
//             break;
//         case 1 : 
//             month = "february";
//             break;
//         case 2 : 
//             month = "march";
//             break;
//         case 3 : 
//             month = "april";
//             break;
//         case 4 : 
//             month = "june";
//             break;
//         case 5 : 
//             month = "july";
//             break;
//         case 6 : 
//             month = "august";
//             break;
//         case 7 : 
//             month = "september";
//             break;
//         case 8 : 
//             month = "october";
//             break;
//         case 9 : 
//             month = "november";
//             break;
//         case 10 : 
//             month = "december";
//             break;
//     }
//     return `${day}-${date}-${month}-${year}`
// }
function getAllPrayHelper(arr){
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        // let day = arr[i].createdAt.slice(8,10);
        // let year = arr[i].createdAt.slice(0,4);

        let obj = {
            id : arr[i].id,
            pray : arr[i].pray,
            user_name : arr[i].User.user_name
            // date : setDate(arr[i].createdAt)
        }
        result.push(obj);
    }
    return result;
}
module.exports=getAllPrayHelper;