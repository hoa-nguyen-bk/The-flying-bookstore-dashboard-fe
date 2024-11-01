export function formatCurrency(amount) {
  if (!amount) return 0;
  // Chuyển số tiền thành chuỗi và thêm dấu chấm phẩy giữa các hàng nghìn
  const formattedAmount = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Thêm ký tự đơn vị tiền tệ (VND)
  return formattedAmount + "đ";
}