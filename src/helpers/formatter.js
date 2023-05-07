export default function formatterMoney(amount){ 
  
  const formatter = new Intl.NumberFormat("pt", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(amount);
}