var config = {
    apiKey: "AIzaSyDDH5T0n7RvrsqCfSwe2C4gQu9787IsNVQ",
    authDomain: "blistering-torch-3871.firebaseapp.com",
    databaseURL: "https://blistering-torch-3871.firebaseio.com",
    storageBucket: "blistering-torch-3871.appspot.com",
  };
firebase.initializeApp(config);
ImageDealer.REF = firebase;
var currentUser ;




/*
    �����T�بϥα��ΡG
    1. �즸�n�J�A���ܦ��n�J���A
    2. �w���n�J���A�Areload �����Ӽ���ܵn�J���A
    3. ���n�J���A

    �n�J/��쪬�A��ܥi�ϥΤU�� logginOption function
*/



$("#signin").click(function () {
  // �n�J�᪺�����欰

});

$("#signout").click(function () {

    // �n�X�᪺�����欰

});

$("#submitData").click(function () {
    // �W�Ƿs�ӫ~
});

$("#editData").click(function () {
    // �s��ӫ~��T
})

$("#removeData").click(function () {
    //�R���ӫ~
})


/*
    �ӫ~���s�bdropdown-menu��
    �T�ذӫ~�z��覡�G
    1. ��ܩҦ��ӫ~
    2. ��ܻ��氪�� NT$10000 ���ӫ~
    3. ��ܻ���C�� NT$9999 ���ӫ~

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


function reProduceAll(allItems) {
    /*
    �M�ŭ����W (#item)���e�W���F��C
    Ū�����^�Ӫ��C�@�Ӱӫ~
    */

  /*
    �Q��for in�s��
  */
  for (var  in ) {

    produceSingleItem();
  }
}
// �C�I�}�@���N���U�@��
function produceSingleItem(sinItemData){
  /*
    ��� sinItemData �`�I�W����ơC
    �Y�A��sinItemData�����줤�èS���ϥΪ̦W�١A�ЦA��user�`�I�s���ϥΪ̦W��
    ��ƻ������iitem���A�Ы� Item ����A����ܨ쭶���W�C
  */

  firebase.database().ref().once("",function () {
    $("#items").append();

      /*
        �� ViewModal ��J�o�� item �����
        �I�s ViewModal callImage���}�Ϥ�
        �Ыؤ@�� MessageBox ����A�N Message �����c��ܤW #message �̡C
      */


      $("#message").append();

      /*
        �P�_�ϥΪ̬O�_���n�J�A�p�G���n�J�N�� #message �e����ܿ�J�ءC
        �b MessageBox �W�����U�ƥ�A�� submit �ɱN��ƤW�ǡC
      */
      if (currentUser) {
        $("#message").append(messBox.inputBox);

        messBox.inputBox.keypress(function (e) {
          if (e.which == 13) {
            e.preventDefault();

            /*
            ���oinput�����e $(this).find("#dialog").val();
            �M��input�����e $(this).find("#dialog").val("");
            */
          }
        });
      }

    /*
    �q��Ʈw����Xmessage��ơA�ñN��ƶ�JMessageBox
    */
      firebase.database().ref().orderBy.("",function(data) {

      });
    });

    /*
    �p�G�ϥΪ̦��n�J�A�� editBtn ��ť�ƥ�A��ϥΪ��I��s����s�ɡA�N�����ܤW uploadModal�C
    */

  })
}

function generateDialog(diaData, messageBox) {


}
