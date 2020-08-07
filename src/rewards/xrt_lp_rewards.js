let wasm;

const u32CvtShim = new Uint32Array(2);
let uint64CvtShim = null;

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (
    cachegetInt32Memory0 === null ||
    cachegetInt32Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}
/**
 * @param {BigInt} lp_token_staked
 * @param {BigInt} total_tokens
 * @returns {BigInt}
 */
export function total_payout(lp_token_staked, total_tokens) {
  uint64CvtShim[0] = lp_token_staked;
  const low0 = u32CvtShim[0];
  const high0 = u32CvtShim[1];
  uint64CvtShim[0] = total_tokens;
  const low1 = u32CvtShim[0];
  const high1 = u32CvtShim[1];
  wasm.total_payout(8, low0, high0, low1, high1);
  var r0 = getInt32Memory0()[8 / 4 + 0];
  var r1 = getInt32Memory0()[8 / 4 + 1];
  u32CvtShim[0] = r0;
  u32CvtShim[1] = r1;
  const n2 = uint64CvtShim[0];
  return n2;
}

async function load(module, imports) {
  if (typeof BigUint64Array === "function") {
    // eslint-disable-next-line no-undef
    uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);
  } else {
    throw new Error("BigUint64Array");
  }
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            e
          );
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

async function init(input) {
  if (typeof input === "undefined") {
    // input = import.meta.url.replace(/\.js$/, '_bg.wasm');
  }
  const imports = {};

  if (
    typeof input === "string" ||
    (typeof Request === "function" && input instanceof Request) ||
    (typeof URL === "function" && input instanceof URL)
  ) {
    input = fetch(input);
  }

  const { instance, module } = await load(await input, imports);

  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;

  return wasm;
}

export default init;
