import Web3 from "web3";

function getWeb3Provider() {
  if (window.ethereum) {
    return { type: 1, provider: window.ethereum };
  } else if (window.web3) {
    console.warn("warrning old metamask");
    return { type: 2, provider: window.web3.currentProvider };
  } else {
    console.log("web3 fallback");
    return {
      type: 3,
      provider: new Web3.providers.WebsocketProvider(
        "wss://mainnet.infura.io/ws/v3/c1ea69ab1e0a4c6aa6a9dcd0641aecc7"
      ),
    };
  }
}

export async function getAccount(web3) {
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    return web3.utils.toChecksumAddress(accounts[0]);
  }
  throw new Error("not account");
}

export async function accountAccess() {
  try {
    await window.ethereum.enable();
    return true;
  } catch (_) {
    return false;
  }
}

export async function isAuthorized() {
  if (!window.ethereum) {
    return false;
  }
  return new Promise((resolve) => {
    window.ethereum.send({ method: "eth_accounts" }, (e, r) => {
      if (e) {
        return resolve(false);
      }
      resolve(!!r.result.length);
    });
  });
}

const initAccount = false;
const initAccessRequired = true;

export const state = {
  isReady: false,
  error: null,
  networkId: null,
  account: null,
  getWeb3: null,
  typeProvider: null,
};

let watch;
export async function init(networks, cb) {
  watch = cb;
  try {
    const provider = getWeb3Provider();
    mutation("typeProvider", provider.type);
    const instance = new Web3(provider.provider);
    mutation("getWeb3", () => instance);
    const networkId = await instance.eth.net.getId();
    mutation("networkId", networkId);
    let error = 0;
    if (!networks.includes(String(networkId))) {
      error = 1;
    } else {
      if (instance && provider.type === 1) {
        window.ethereum.on("networkChanged", function (networkId) {
          mutation("networkId", networkId);
        });
        window.ethereum.on("accountsChanged", function (accounts) {
          if (accounts.length > 0) {
            mutation("account", instance.utils.toChecksumAddress(accounts[0]));
          } else {
            mutation("account", null);
          }
        });
        if (initAccount || (await isAuthorized())) {
          if (await accountAccess()) {
            try {
              mutation("account", await getAccount(instance));
            } catch (_) {
              error = 2;
            }
          } else if (initAccessRequired) {
            error = 3;
            console.log("not access");
          }
        }
      } else if (instance && provider.type === 2) {
        try {
          mutation("account", await getAccount(instance));
        } catch (_) {
          error = 2;
        }
      }
    }
    if (error > 0) {
      mutation("isReady", false);
      mutation("error", error);
      return false;
    }
    mutation("isReady", true);
    mutation("error", null);
    return instance;
  } catch (e) {
    console.log(e);
    mutation("isReady", false);
    mutation("error", 4);
    return false;
  }
}

export async function accessAccount() {
  const instance = state.getWeb3();
  const typeProvider = state.typeProvider;
  let error = 0;
  if (instance && typeProvider === 1) {
    if (await accountAccess()) {
      try {
        mutation("account", await getAccount(instance));
      } catch (_) {
        error = 2;
      }
    } else {
      error = 3;
      console.log("not access");
    }
  } else if (instance && typeProvider === 2) {
    try {
      mutation("account", await getAccount(instance));
    } catch (_) {
      error = 2;
    }
  }
  if (error > 0) {
    mutation("isReady", false);
    mutation("error", error);
    return false;
  }
  mutation("isReady", true);
  mutation("error", null);
  return instance;
}

function mutation(field, value) {
  state[field] = value;
  if (watch) {
    watch(state);
  }
}
