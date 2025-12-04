// carrinho.js (versão corrigida e mais robusta)

document.addEventListener("DOMContentLoaded", () => {
  // delegação: captura cliques em botões dentro da tabela
  const tableBody = document.querySelector("tbody");

  if (!tableBody) return;

  tableBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-qtd");
    if (!btn) return;

    // define se é aumento ou diminuição
    const isIncrease = btn.classList.contains("increase");
    const isDecrease = btn.classList.contains("decrease");

    if (!isIncrease && !isDecrease) return;

    const td = btn.closest(".qtd");
    if (!td) return;

    const input = td.querySelector(".input-qtd");
    if (!input) return;

    const tr = btn.closest("tr");
    const price = parseFloat(tr.dataset.price) || 0;
    let qty = parseInt(input.value, 10) || 0;

    qty = isIncrease ? qty + 1 : qty - 1;

    // se ficou <= 0, pedir confirmação para remover
    if (qty <= 0) {
      const confirmed = confirm("Quantidade zerada. Deseja remover este item do carrinho?");
      if (confirmed) {
        tr.remove();
        updateTotals();
      } else {
        // mantém 1 (ou mantém o valor anterior). Aqui optamos por voltar para 1.
        input.value = 1;
        updateTotals();
      }
      return;
    }

    // atualiza input e totais do item
    input.value = qty;
    const itemTotalCell = tr.querySelector(".item-total");
    if (itemTotalCell) {
      itemTotalCell.textContent = formatBRL(price * qty);
    }

    updateTotals();
  });

  // recalcula totais ao carregar
  updateTotals();
});

/** recalcula o total por item (se necessário) e o total geral */
function updateTotals() {
  const rows = document.querySelectorAll("tbody tr");
  let grand = 0;

  rows.forEach(row => {
    const price = parseFloat(row.dataset.price) || 0;
    const input = row.querySelector(".input-qtd");
    const qty = input ? (parseInt(input.value, 10) || 0) : 0;
    const itemTotalCell = row.querySelector(".item-total");

    const itemTotal = price * qty;
    if (itemTotalCell) itemTotalCell.textContent = formatBRL(itemTotal);

    grand += itemTotal;
  });

  // mostra total geral (cria elemento se não existir)
  let totalBox = document.querySelector(".cart-grand-total");
  if (!totalBox) {
    totalBox = document.createElement("div");
    totalBox.className = "cart-grand-total";
    totalBox.style.marginTop = "18px";
    totalBox.style.fontWeight = "700";
    totalBox.style.fontSize = "18px";
    totalBox.style.textAlign = "right";
    const container = document.querySelector(".container");
    container.appendChild(totalBox);
  }
  totalBox.textContent = "Total: " + formatBRL(grand);
}

/** formata número para "R$ 123,45" */
function formatBRL(number) {
  return "R$ " + Number(number).toFixed(2).replace(".", ",");
}
