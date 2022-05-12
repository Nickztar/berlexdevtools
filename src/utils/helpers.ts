export function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}

export const noop = () => {};

export function on<T extends Window | Document | HTMLElement | EventTarget>(
    obj: T | null,
    ...args:
        | Parameters<T["addEventListener"]>
        | [string, Function | null, ...any]
): void {
    if (obj && obj.addEventListener) {
        obj.addEventListener(
            ...(args as Parameters<HTMLElement["addEventListener"]>)
        );
    }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
    obj: T | null,
    ...args:
        | Parameters<T["removeEventListener"]>
        | [string, Function | null, ...any]
): void {
    if (obj && obj.removeEventListener) {
        obj.removeEventListener(
            ...(args as Parameters<HTMLElement["removeEventListener"]>)
        );
    }
}

export const isBrowser = typeof window !== "undefined";

export const isNavigator = typeof navigator !== "undefined";
