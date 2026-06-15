import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function hasChineseChars(str: string): boolean {
  return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(str);
}

export function getNameMaxLength(name: string): number {
  return hasChineseChars(name) ? 12 : 20;
}

export function getNameError(name: string): string | null {
  if (!name.trim()) return null;
  const maxLen = getNameMaxLength(name);
  if (name.length > maxLen) {
    return hasChineseChars(name)
      ? `最多 12 个汉字 / Max 12 characters`
      : `最多 20 个字符 / Max 20 characters`;
  }
  return null;
}
