import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isTrue = (value: boolean | undefined) => {
  return value === true;
};

export const isFalse = (value: boolean | undefined) => {
  return value === false;
};

export const isEmptyString = (value: string | null | undefined) => {
  return value === "" || value === null || value === undefined;
};

export const isNotEmptyString = (value: string | null | undefined) => {
  return value !== "" && value !== null && value !== undefined;
};

export const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

export const isEmptyArray = (value: unknown[]) => {
  return value.length === 0;
};

export const isNotEmptyArray = (value: unknown[]) => {
  return value.length !== 0;
};

export const isEmptyObject = (value: object) => {
  return Object.keys(value).length === 0;
};

export const isNotEmptyObject = (value: object) => {
  return Object.keys(value).length !== 0;
};

export const isNull = (value: unknown): boolean => {
  return value === null || value === undefined;
};

export const isNotNull = (value: unknown): boolean => {
  return value !== null && value !== undefined;
};
