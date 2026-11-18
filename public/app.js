const $=id=>document.getElementById(id);
const cfg=()=>window.AIOO_CONFIG||{wallets:{},contact:{},walletList:[]};
let prices={BTC:97000,ETH:3400,USDT:1,USDC:1,USD:1,CNY:7.2,EUR:0.92};
async function loadPrices(){
  try{
    const r=await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,usd-coin&vs_currencies=usd,cny,eur");
    const d=await r.json();
    prices={BTC:d.bitcoin.usd,ETH:d.ethereum.usd,USDT:d.tether.usd,USDC:d["usd-coin"].usd,USD:1,CNY:d.tether.cny||7.2,EUR:d.tether.eur||0.92};
    window._rates={USD:1,CNY:d.bitcoin.cny/d.bitcoin.usd,EUR:d.bitcoin.eur/d.bitcoin.usd};
    $("livePrice").textContent=`实时价格: BTC $${d.bitcoin.usd.toLocaleString()} · ETH $${d.ethereum.usd.toLocaleString()} · USDT $${d.tether.usd} — 数据 CoinGecko ${new Date().toLocaleTimeString()}`;
  }catch(e){ $("livePrice").textContent="实时价格加载失败，工具仍可使用示例价格计算（请以交易所为准）"; }
}
function rate(sym){ if(["USD","CNY","EUR"].includes(sym)) return window._rates?window._rates[sym]:prices[sym]/prices.USD; return prices[sym]; }
function convertPrice(){ const amt=parseFloat($("convAmount").value)||0; const f=$("convFrom").value,t=$("convTo").value;
  let usdVal = ["USD","CNY","EUR"].includes(f)? amt/(window._rates?window._rates[f]:1) : amt*prices[f];
  let out = ["USD","CNY","EUR"].includes(t)? usdVal*(window._rates?window._rates[t]:1) : usdVal/prices[t];
  $("convResult").textContent=`${amt} ${f} ≈ ${out.toLocaleString(undefined,{maximumFractionDigits:6})} ${t}`; }
async function loadBtcFee(){ $("btcFee").textContent="加载中..."; try{ const r=await fetch("https://mempool.space/api/v1/fees/recommended"); const d=await r.json(); $("btcFee").innerHTML=`🚀 快 (10分钟): <b>${d.fastestFee} sat/vB</b><br>⚡ 中 (30分钟): <b>${d.halfHourFee} sat/vB</b><br>🐢 慢 (1小时): <b>${d.hourFee} sat/vB</b><br>经济: ${d.economyFee} · 最低: ${d.minimumFee} sat/vB`; }catch(e){ $("btcFee").textContent="加载失败，请稍后重试或访问 mempool.space"; } }
async function loadEthGas(){ $("ethGas").textContent="加载中..."; try{ const r=await fetch("https://ethereum-rpc.publicnode.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",method:"eth_gasPrice",params:[],id:1})}); const d=await r.json(); const gwei=parseInt(d.result,16)/1e9; $("ethGas").innerHTML=`当前 Gas Price: <b>${gwei.toFixed(2)} Gwei</b><br>普通转账 (21000 gas) 约: ${(gwei*21000/1e9).toFixed(6)} ETH`; }catch(e){ $("ethGas").textContent="公共节点暂不可用，请稍后重试"; } }
function qrUrl(data,size){ return `https://api.qrserver.com/v1/create-qr-code/?size=${size||200}x${size||200}&data=${encodeURIComponent(data)}`; }
function makeQr(){ const t=$("qrText").value.trim(); if(!t) return alert("先粘贴地址"); $("qrResult").innerHTML=`<img src="${qrUrl(t,200)}" alt="QR"><br><small>${t.slice(0,42)}...</small>`; }
function calcProfit(){ const b=parseFloat($("buyPrice").value),s=parseFloat($("sellPrice").value),q=parseFloat($("qty").value); if(!b||!s||!q) return alert("填完买入/卖出/数量"); const pnl=(s-b)*q; const pct=((s-b)/b*100).toFixed(2); $("profitResult").innerHTML=`盈亏: <b style="color:${pnl>=0?'#22c55e':'#ef4444'}">${pnl.toFixed(2)}</b> · 涨跌幅 ${pct}%`; }
function walletFor(net){ return cfg().wallets[net]||""; }
function uriPrefixFor(net){
  if(net==="BTC"||net==="BTC_SEGWIT"||net==="BTC_LEGACY") return "bitcoin:";
  if(net==="XMR") return "monero:";
  if(net==="ETH"||net==="EVM"||String(net).includes("ERC20")||String(net).includes("BEP20")||String(net).includes("POLYGON")||String(net).includes("ARBITRUM")||String(net).includes("OPTIMISM")) return "ethereum:";
  return "";
}
function payData(net,addr){ const p=uriPrefixFor(net); return p? p+addr : addr; }
function copyAddr(text,btn){ try{ navigator.clipboard.writeText(text); if(btn){ const old=btn.textContent; btn.textContent="已复制 ✓"; setTimeout(()=>btn.textContent=old,1600);} }catch(e){ prompt("复制地址:",text); } }
function makePayment(){ const amt=$("payAmount").value,net=$("payNetwork").value,addr=walletFor(net); if(!addr){ $("payResult").innerHTML=`<b>${amt} - ${net}</b><br>⚠️ 该网络收款地址未配置。`; return; } const data=payData(net,addr); $("payResult").innerHTML=`<img src="${qrUrl(data,220)}" alt="收款二维码"><br><b>${amt} - ${net}</b><br><span class="addr">${addr}</span><br><button type="button" onclick="copyAddr('${addr}',this)">复制地址</button><br><small>扫码或复制地址转账, 务必核对网络一致; 转账后保存 TxID 以便确认。</small>`; }
function quickPay(amt){ const netEl=$("payNetwork"); if(netEl) netEl.value="USDT_TRC20"; if($("payAmount")) $("payAmount").value=amt; const addr=walletFor("USDT_TRC20"); if(!addr){ $("quickPayResult").innerHTML=`<b>${amt} USDT 咨询</b>：收款地址未配置。`; return; } $("quickPayResult").innerHTML=`请转 <b>${amt} USDT (TRC20, 手续费最低)</b>:<br><img src="${qrUrl(addr,220)}" alt="USDT TRC20 收款二维码"><br><span class="addr">${addr}</span><br><button type="button" onclick="copyAddr('${addr}',this)">复制地址</button><br><small>其他网络付款请看下方「扫码付款」区 (EVM / BTC / XMR 均可)。转完保存 TxID, 发给 Telegram 客服 <a href="https://t.me/aiiox_bot" target="_blank" rel="noopener">@aiiox_bot</a> 确认。</small>`; $("quickPayResult").scrollIntoView({behavior:"smooth"}); }
function renderWallets(){ const grid=$("walletGrid"); if(!grid) return; const list=cfg().walletList||[]; grid.innerHTML=list.map(w=>{ const addr=walletFor(w.key); if(!addr) return ""; const data=(w.uriPrefix||"")+addr; return `<div class="card center"><h3>${w.label}</h3><img class="wallet-qr" src="${qrUrl(data,220)}" alt="${w.label} 收款二维码"><div class="addr">${addr}</div><button type="button" onclick="copyAddr('${addr}',this)">复制地址</button><p class="small">${w.note||""}</p></div>`; }).join(""); }
function joinWaitlist(e){ e.preventDefault(); const c=$("wlContact").value; $("wlResult").textContent=`已暂存在你的浏览器里：${c} — 候补名单后端正在接入，正式开放后请再留一次联系方式，上线会第一时间通知你。`; localStorage.setItem("aioo_waitlist",c); }
window.addEventListener("load",()=>{loadPrices(); loadBtcFee(); renderWallets();});
