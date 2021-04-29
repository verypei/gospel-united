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
function getAllPrayHelper(arr, supportData){
    // console.log(arr,"-----",supportData,"---->>>>>");
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        // console.log(supportData,"---->>>>",arr[i].id,"::::::--->>>>");
        let obj = {
            id : arr[i].id,
            pray : arr[i].pray,
            up_lifting : arr[i].up_lifting,
            support: arr[i].support,
            user_name : arr[i].User.user_name,
            supportedBy : []
        }
        for (let j = 0; j < supportData.length; j++) {
            if(supportData[j].pray_id === arr[i].id){
                // console.log("masuk ke if");
                obj.supportedBy.push(supportData[j].user_id);
            }
        }
        result.push(obj);
    }
    return result;
}
module.exports=getAllPrayHelper;