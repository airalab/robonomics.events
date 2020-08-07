/* tslint:disable */
/* eslint-disable */
/**
* @param {BigInt} lp_token_staked
* @param {BigInt} total_tokens
* @returns {BigInt}
*/
export function total_payout(lp_token_staked: BigInt, total_tokens: BigInt): BigInt;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly total_payout: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly main: (a: number, b: number) => number;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
        