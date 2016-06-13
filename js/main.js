
//src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"

  var config = {
    apiKey: "AIzaSyA_IYAzECEPFdq7VoS_6ywD8_9BSdQAg4Y",
    authDomain: "easyauction-a8064.firebaseapp.com",
    databaseURL: "https://easyauction-a8064.firebaseio.com",
    storageBucket: "easyauction-a8064.appspot.com",
  };
  firebase.initializeApp(config);
  ImageDealer.REF = firebase;
  var currentUser;
  var viewModal = new ViewModal($("#view-modal"));
  var uploadModal = new UploadModal($("#upload-modal"));
/*選取資料位置*/
// firebase.database().ref("items")

/*創造資料*/
// firebase.database().ref("items/firstItems").set(data);
// firebase.database().ref("items/firstItems").push(data);

/*存取資料*/
// firebase.database().ref("items").orderByChild("price").sta
// rtAt(10000).once("value",reProduceAll);

/*
    分為三種使用情形：
    1. 初次登入，改變成登入狀態
    2. 已為登入狀態，reload 網站照樣顯示登入狀態
    3. 未登入狀態

    登入/當初狀態顯示可使用下方 logginOption function
*/
 
 logginOption(false);
 firebase.auth().onAuthStateChanged(function (user) {
    if(user){
        logginOption(true);
        firebase.database().ref("Items").once("value",reProduceAll);
    }else{
        logginOption(false);
        firebase.database().ref("Items").once("value",reProduceAll);
    }
  });


var fbProvider = new firebase.auth.FacebookAuthProvider();


  $("#signin").click(function () {
    firebase.auth().signInWithPopup(fbProvider).then(function
    (result) {
      var data ={};
      data["/users/"+ result.user.uid +"/name"]= result.user.displayName;
      data["/users/"+ result.user.uid +"/picURL"]= result.user.photoURL;
      firebase.database().ref().update(data);
  //登入後的頁面行為
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessa = error.message;
      console.log(errorCode,errorMessa);
  });
  });

  $("#signout").click(function () {
    // 登出後的頁面行為
    firebase.auth().signOut().then(function() {
      //登出後所執行之行為
    },function(error) {
      console.log(error.code);
      });   
  });

  $("#submitData").click(function () {
    if($("#itemName").val()!=null&& $("#price").val() !=null && $("#descrip").val() !=null &&  $("#picData")[0].files[0]){
    var itemKey = firebase.database().ref("Items").push({"title":$("#itemName").val(),"price":parseInt($("#price").val()),"descrip":$("#descrip").val(),"seller":firebase.auth().currentUser.uid}).key;

    var data ={};
    data["/users/"+ firebase.auth().currentUser.uid +"/sellItems/"+ itemKey]= true;
    firebase.database().ref().update(data);

    uploadModal.itemKey = itemKey;
    uploadModal.submitPic(firebase.auth().currentUser.uid);
    
    // 上傳新商品

    }
   // uploadModal.submitPic(firebase.auth().currentUser.uid);
   // var currentUser = firebase.auth().currentUser;
  });


  $("#editData").click(function () {
    /*更新資料*/
    if($("#itemName").val()!=null&& $("#price").val() !=null && $("#descrip").val() !=null){
    var data ={};
    data["/Items/"+ uploadModal.itemKey+"/title"]= $("#itemName").val();
    data["/Items/"+ uploadModal.itemKey+"/descrip"]= $("#descrip").val();
    data["/Items/"+ uploadModal.itemKey+"/price"]= parseInt($("#price").val());
    firebase.database().ref().update(data);
  }
  if ($("#picData")[0].files[0]) {
    uploadModal.submitPic(firebase.auth().currentUser.uid);
  }else{
    $("#upload-modal").modal("hide");
  }
  });


  $("#removeData").click(function () {
      //刪除商品
      /*刪除資料*/
   firebase.database().ref( "Items/" + uploadModal.itemKey).remove();
   $("#upload-modal").modal("hide");
  });


/*
    商品按鈕在dropdown-menu中
    三種商品篩選方式：
    1. 顯示所有商品
    2. 顯示價格高於 NT$10000 的商品
    3. 顯示價格低於 NT$9999 的商品

*/


function logginOption(isLoggin) {
  if (isLoggin) {
    $("#upload").css("display","block");
    $("#signin").css("display","none");
    $("#signout").css("display","block");
  }else {
    $("#upload").css("display","none");
    $("#signin").css("display","block");
    $("#signout").css("display","none");
  }
}
//function updateItem(title, price, descrip, pic) {
//items.push({"title":title, "price":parseInt(price), "descrip":descrip, "imgD":pic, "userTime": new Date($.now()).toLocaleString()});
//}


function reProduceAll(allItems) {
    /*
    清空頁面上 (#item)內容上的東西。
    讀取爬回來的每一個商品
    */
    $("#items").empty();
    var allData= allItems.val();
  for (var itemKey in allData ) {
    var sinData=allData[itemKey];
    sinData.itemKey =itemKey;
    produceSingleItem(sinData);
  }
}
// 每點開一次就註冊一次
function produceSingleItem(sinItemData){
  /*
    抓取 sinItemData 節點上的資料。
    若你的sinItemData資料欄位中並沒有使用者名稱，請再到user節點存取使用者名稱
    資料齊全後塞進item中，創建 Item 物件，並顯示到頁面上。
  */

  firebase.database().ref("users/" + sinItemData.seller + "/name" ).once("value",function (nameD) {
    var name = nameD.val();
    sinItemData.sellerName= name;
    var tpItem =new Item(sinItemData, firebase.auth().currentUser);
    $("#items").append(tpItem.dom);
    tpItem.viewBtn.click(function() {
      // body...
      viewModal.writeData(sinItemData);
      viewModal.callImage(sinItemData.itemKey,sinItemData.seller);
    })

      /*
        用 ViewModal 填入這筆 item 的資料
        呼叫 ViewModal callImage打開圖片
        創建一個 MessageBox 物件，將 Message 的結構顯示上 #message 裡。
      */


      $("#message").append();

      /*
        判斷使用者是否有登入，如果有登入就讓 #message 容器顯示輸入框。
        在 MessageBox 上面註冊事件，當 submit 時將資料上傳。
      */
      if (currentUser) {
        $("#message").append(messBox.inputBox);

        messBox.inputBox.keypress(function (e) {
          if (e.which == 13) {
            e.preventDefault();

            /*
            取得input的內容 $(this).find("#dialog").val();
            清空input的內容 $(this).find("#dialog").val("");
            */
          }
        });
      }

    /*
    從資料庫中抓出message資料，並將資料填入MessageBox
    */
     /* firebase.database().ref().orderBy."items",(function (data) {
    
      });
    });
*/
    /*
    如果使用者有登入，替 editBtn 監聽事件，當使用者點選編輯按鈕時，將資料顯示上 uploadModal。
    */
    if (tpItem.editBtn) {
      tpItem.editBtn.click(function () {
        // body...
        uploadModal.editData(sinItemData);
        uploadModal.callImage(sinItemData.itemKey, sinItemData.seller);
      });
    }
  })
}

// function generateDialog(diaData, messageBox) {}

/*新增留言
var viewModal = new ViewModal($(“#view-modal”));
var uploadModal = new UploadModal($(“#upload-modal”));

var messages = new MessageBox(firebase.auth().currentUser, itemKey);
messages.addDialog({message:”留言”, time: 1487529, name: “Radia”, picURL:”http:”});
*/