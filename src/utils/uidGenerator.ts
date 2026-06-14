/**
 * 生成随机字母字符串
 * @param length 长度
 */
function generateRandomLetters(length: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

/**
 * 生成 App UID
 * 格式: yy + 随机4字母 + mm + 随机4字母 + dd + 随机4字母 + hh + 随机4字母 + 分钟 + 随机4字母
 * 示例: 25aBcD03eFgH15iJkL10mNoP30qRsT
 */
export function generateUID(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  const random1 = generateRandomLetters(4);
  const random2 = generateRandomLetters(4);
  const random3 = generateRandomLetters(4);
  const random4 = generateRandomLetters(4);
  const random5 = generateRandomLetters(4);

  return `${yy}${random1}${mm}${random2}${dd}${random3}${hh}${random4}${min}${random5}`;
}
