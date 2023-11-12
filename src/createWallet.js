const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// definição da rede
// bitcoin: rede principal (mainnet)
// testnet: rede de testes
const network = bitcoin.networks.testnet

// caminho de derivação de endereços para criação das carteiras
const path = "m/49'/1'/0'/0"

// geração das palavras mnemônicas
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// definição da raiz da árvore de derivação
let root = bip32.fromSeed(seed, network)

// criação de uma conta
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// criação de uma carteira
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log('Carteira gerada com sucesso!')
console.log('Palavras mnemônicas: ' + mnemonic)
console.log('Endereço da carteira: ' + btcAddress)
console.log('Chave privada: ' + node.toWIF())
