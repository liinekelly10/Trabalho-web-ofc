// minimal-next.js
$(function(){
  $(".next").off("click").on("click", function(){
    var current_fs = $(this).closest("fieldset");
    var next_fs = current_fs.next("fieldset");
    console.log("advancing from", current_fs.index(), "to", next_fs.index());

    if(next_fs.length){
      current_fs.hide();
      next_fs.show();
      // atualiza progressbar
      $("#progressbar li").removeClass("active");
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    } else {
      console.log("no next fieldset found");
    }
  });

  $(".previous").off("click").on("click", function(){
    var current_fs = $(this).closest("fieldset");
    var prev_fs = current_fs.prev("fieldset");
    console.log("going back from", current_fs.index(), "to", prev_fs.index());

    if(prev_fs.length){
      current_fs.hide();
      prev_fs.show();
      $("#progressbar li").removeClass("active");
      $("#progressbar li").eq($("fieldset").index(prev_fs)).addClass("active");
    } else {
      console.log("no previous fieldset found");
    }
  });

  document.getElementById("cpf").addEventListener("input", function (e) {
    let value = e.target.value;

    // Remove tudo que não seja número
    value = value.replace(/\D/g, "");

    // Aplica a máscara
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    e.target.value = value;

  });

});

function mascaraTelefone(campo) {
    let v = campo.value.replace(/\D/g, ""); // remove tudo que não é número

    // Permite backspace sem travar
    if (campo.value.length < campo.oldValueLength) {
        campo.oldValueLength = campo.value.length;
        return;
    }

    if (v.length > 11) v = v.slice(0, 11);

    let formatted = "";

    if (v.length > 0) {
        formatted = "(" + v.substring(0, 2);
    }
    if (v.length >= 3) {
        formatted += ")" + v.substring(2, 7);
    }
    if (v.length >= 8) {
        formatted += "-" + v.substring(7, 11);
    }

    campo.value = formatted;
    campo.oldValueLength = campo.value.length;
}

function mascaraCEP(campo) {
    let v = campo.value.replace(/\D/g, ""); // só números

    // Permite apagar sem travar
    if (campo.value.length < campo.oldValueLength) {
        campo.oldValueLength = campo.value.length;
        return;
    }

    if (v.length > 8) v = v.slice(0, 8);

    let formatted = "";

    if (v.length > 5) {
        formatted = v.slice(0,5) + "-" + v.slice(5);
    } else {
        formatted = v;
    }

    campo.value = formatted;
    campo.oldValueLength = campo.value.length;
}
