// ============================================
// AIOO 配置文件 - 收款钱包地址 (仅公开地址, 切勿写入私钥/助记词)
// Wallets provided by site owner on 2026-11-15
// ============================================
window.AIOO_CONFIG = {
  siteName: "AIOO · Crypto Tool Matrix",
  wallets: {
    // Tron TRC-20
    USDT_TRC20: "TSc9a2g2ezCT1AeaAA21xcTCfvYj4zzgCd",
    TRX_TRC20: "TSc9a2g2ezCT1AeaAA21xcTCfvYj4zzgCd",
    // EVM address — same address for Ethereum / BNB Chain / Polygon / Arbitrum / Optimism
    USDT_ERC20: "0xb67E89e31150a8f449A3893326DFD8483fe4962c",
    USDC_ERC20: "0xb67E89e31150a8f449A3893326DFD8483fe4962c",
    USDT_BEP20: "0xb67E89e31150a8f449A3893326DFD8483fe4962c",
    USDT_POLYGON: "0xb67E89e31150a8f449A3893326DFD8483fe4962c",
    USDT_ARBITRUM: "0xb67E89e31150a8f449A3893326DFD8483fe4962c",
    USDT_OPTIMISM: "0xb67E89e31150a8f449A3893326DFD8483fe4962c",
    ETH: "0xb67E89e31150a8f449A3893326DFD8483fe4962c",
    EVM: "0xb67E89e31150a8f449A3893326DFD8483fe4962c",
    // Bitcoin — SegWit (bc1, preferred, lower fees) + Legacy (1...)
    BTC: "bc1qjrgpgarf4d5wen3wylp9uh7f959hpct4lrflwq",
    BTC_SEGWIT: "bc1qjrgpgarf4d5wen3wylp9uh7f959hpct4lrflwq",
    BTC_LEGACY: "13u7DK8bknbXY8SAE14EwqbrcfGJaUKZsg",
    // Monero
    XMR: "8BHsWMC3mdxhRqtVz44qtELkjhqiQRQUsca8qj2BeNNRSsiYTE8oknuQBSfT7746FwfmzJNntQom7gziZj2pBb4p3DbZ1MU"
  },
  // Display list for the "扫码付款 / 收款地址" section — every entry gets its own QR code
  walletList: [
    { key: "USDT_TRC20", label: "USDT · TRC-20 (波场 Tron)", note: "手续费最低, 推荐优先使用。转账时务必选 TRC-20 网络。", uriPrefix: "" },
    { key: "EVM", label: "USDT / USDC / ETH · EVM 多链", note: "同一地址适用于 Ethereum、BNB Chain、Polygon、Arbitrum、Optimism。转账时务必选与你钱包一致的网络, 选错网络可能丢币。", uriPrefix: "ethereum:" },
    { key: "BTC_SEGWIT", label: "Bitcoin · BTC (SegWit bc1)", note: "优先使用, 手续费更低。", uriPrefix: "bitcoin:" },
    { key: "BTC_LEGACY", label: "Bitcoin · BTC (Legacy)", note: "旧格式地址, 同样可正常收款。", uriPrefix: "bitcoin:" },
    { key: "XMR", label: "Monero · XMR (门罗币)", note: "隐私币, 请使用 XMR 网络直接转到此地址。", uriPrefix: "monero:" }
  ],
  contact: {
    telegram: "https://t.me/aiiox_bot",
    email: "aieiu@outlook.com",
    wechat: ""
  },
  pricing: {
    consult_30min: { usdt: 29, label: "30分钟 1对1咨询 / 30-min Consultation" },
    consult_60min: { usdt: 49, label: "60分钟 深度咨询 + 方案 / Deep Consultation" },
    customTool: { usdt: 199, label: "定制小工具开发 起 / Custom Tool from" }
  }
};
