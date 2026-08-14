const services = [
  {id:"baru",name:"Paspor Baru",desc:"Permohonan paspor pertama",icon:"▣",color:"#1267e8"},
  {id:"ganti",name:"Penggantian Paspor",desc:"Paspor habis/halaman penuh",icon:"↻",color:"#18a67a"},
  {id:"hilang",name:"Paspor Hilang",desc:"Panduan saat paspor hilang",icon:"!",color:"#df3636"},
  {id:"rusak",name:"Paspor Rusak",desc:"Panduan paspor rusak",icon:"▥",color:"#d93636"},
  {id:"anak",name:"Paspor Anak",desc:"Informasi untuk anak",icon:"♙",color:"#7053c7"},
  {id:"biaya",name:"Biaya Paspor",desc:"Estimasi tarif layanan",icon:"Rp",color:"#f0a91e"},
  {id:"syarat",name:"Persyaratan",desc:"Dokumen yang disiapkan",icon:"✓",color:"#1669d9"},
  {id:"prosedur",name:"Prosedur & Waktu",desc:"Tahapan pelayanan",icon:"◷",color:"#2465cc"},
  {id:"lokasi",name:"Lokasi Pelayanan",desc:"Alamat & jam layanan",icon:"●",color:"#3575d4"},
  {id:"biometrik",name:"Foto & Biometrik",desc:"Tahapan pengambilan data",icon:"▣",color:"#2673a7"},
  {id:"perjalanan",name:"Persiapan Perjalanan",desc:"Tips sebelum bepergian",icon:"✈",color:"#7c55c7"},
  {id:"lainnya",name:"Lainnya",desc:"Informasi umum",icon:"•••",color:"#34a85a"}
];

const answers = {
  syarat: `<b>Persyaratan PASPOR BARU untuk WNI dewasa</b><br><br>✅ KTP elektronik<br>✅ Kartu Keluarga<br>✅ Akta kelahiran / ijazah / buku nikah<br>✅ Paspor lama jika pernah memiliki<br>✅ Surat pewarganegaraan bagi WNA yang menjadi WNI<br>✅ Dokumen pendukung lainnya bila diperlukan<br><br><span class="notice">Bawa dokumen asli. Persyaratan dapat menyesuaikan kondisi pemohon dan ketentuan yang berlaku.</span>`,
  hilang: `<b>Jika paspor hilang</b><br><br>Segera laporkan kehilangan dan ikuti pemeriksaan petugas. Siapkan identitas serta dokumen pendukung yang tersedia. Setelah proses pemeriksaan selesai, petugas akan menjelaskan langkah permohonan penggantian paspor.`,
  biaya: `<b>Biaya paspor</b><br><br>Tarif bergantung pada jenis paspor dan layanan yang dipilih. Contoh tampilan demo: <b>Paspor biasa 10 tahun — Rp650.000</b>.<br><br><span class="notice warn">Angka pada prototype adalah contoh. Sesuaikan dengan tarif resmi terbaru sebelum dipublikasikan.</span>`,
  prosedur: `<b>Alur umum pelayanan</b><br><br>1. Pendaftaran<br>2. Pemeriksaan dokumen<br>3. Foto & biometrik<br>4. Wawancara<br>5. Pembayaran bila berlaku<br>6. Pengambilan/pengiriman paspor`,
  lokasi: `<b>Kantor Imigrasi Kelas II TPI Selatpanjang</b><br><br>Jl. Dorak, Selatpanjang, Kec. Tebing Tinggi, Kab. Kep. Meranti, Riau 28753.<br><br><b>Jam layanan demo</b><br>Senin–Jumat 08.00–15.30 WIB<br>Istirahat 12.00–13.00 WIB`
};

let state = {view:"home", detail:null, history:[]};

function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window._tt);window._tt=setTimeout(()=>t.classList.remove("show"),2200)}
function iconService(s){return `<div class="ico" style="background:${s.color}">${s.icon}</div>`}
function serviceGrid(list=services){return `<div class="grid">${list.map(s=>`<button class="service" data-service="${s.id}">${iconService(s)}<b>${s.name}</b><small>${s.desc}</small></button>`).join("")}</div>`}

function home(){
 return `<section class="hero">
   <div class="hero-content">
    <h1>SAPA <span>FIND</span></h1>
    <p>Asisten Informasi Layanan Keimigrasian <b>Imigrasi Selatpanjang</b></p>
    <p>Saya siap membantu Anda menemukan informasi layanan keimigrasian dengan cepat, mudah, dan terarah.</p>
    <button class="primary" data-view="chat">💬 KETUK MULAINYA&nbsp; →</button>
   </div>
   <div class="hero-mascot">👩🏻‍✈️</div>
 </section>
 <div class="trust-row"><div class="trust">⚡<b>Cepat</b>Informasi instan</div><div class="trust">✓<b>Akurat</b>Sumber resmi</div><div class="trust">☷<b>Lengkap</b>Menu terstruktur</div><div class="trust">♡<b>Mudah</b>Antarmuka sederhana</div></div>
 <div class="search"><input id="homeSearch" placeholder="Cari layanan atau informasi..." autocomplete="off"><button id="searchBtn">Cari</button></div>
 <div class="section-head"><h2>⭐ Informasi Populer</h2><button data-view="services">Lihat Semua</button></div>
 ${serviceGrid(services.slice(0,8))}
 <div class="section-head"><h2>🧾 Cek Kesiapan Saya</h2></div>
 <button class="quick-card" data-view="checklist"><div class="quick-icon">✓</div><div><h3>Panduan singkat sebelum mengajukan permohonan</h3><p>Centang dokumen yang sudah Anda siapkan.</p></div><div class="arrow">›</div></button>
 <div class="section-head"><h2>❓ Pertanyaan Populer</h2><button data-view="faq">Lihat Semua</button></div>
 <div class="cards">
   <button class="list-item" data-faq="Apakah paspor lama harus dibawa?"><div class="li-ico">?</div><div><strong>Apakah paspor lama harus dibawa?</strong><small>Lihat jawaban</small></div><span class="arrow">›</span></button>
   <button class="list-item" data-faq="Apa yang harus dilakukan jika paspor hilang?"><div class="li-ico">!</div><div><strong>Apa yang harus dilakukan jika paspor hilang?</strong><small>Panduan singkat</small></div><span class="arrow">›</span></button>
 </div>
 <div class="footer">© 2024 Imigrasi Selatpanjang · <b>SAPA FIND v2.0.0</b><br>Prototype informasi — sesuaikan data resmi sebelum digunakan.</div>`;
}

function servicesView(){
 return `<div class="section-head"><h2>Semua Layanan</h2><button data-view="home">Beranda</button></div>
 <div class="search"><input id="serviceSearch" placeholder="Cari layanan..."><button id="serviceSearchBtn">Cari</button></div>
 <div id="serviceGrid">${serviceGrid()}</div>
 <div class="section-head"><h2>Fitur unggulan</h2></div>
 <div class="two"><div class="stat"><b>12+</b><small>Kategori layanan demo</small></div><div class="stat"><b>24/7</b><small>Akses informasi</small></div></div>`;
}

function detail(id){
 const s=services.find(x=>x.id===id);
 if(!s) return home();
 const title=s.name;
 if(id==="biaya") return biayaDetail();
 if(id==="prosedur") return prosedurDetail();
 if(id==="lokasi") return lokasiDetail();
 if(id==="syarat") return syaratDetail();
 if(id==="hilang") return hilangDetail();
 return `<div class="detail-head"><div class="backline"><button data-back>←</button><span>Layanan</span></div><h1>${title}</h1><p>${s.desc}</p></div>
 <div class="detail-img">${id==="baru"||id==="ganti"||id==="anak"?passportSVG(id):"📋"}</div>
 <div class="info-card"><h3>Informasi Lengkap ${title}</h3><p>${genericDescription(id)}</p></div>
 <div class="section-head"><h2>Yang perlu diketahui</h2></div>
 <div class="feature-list">
  <button data-open-info="Syarat"><span>▣</span><b>Persyaratan</b><span>›</span></button>
  <button data-open-info="Prosedur"><span>◷</span><b>Prosedur</b><span>›</span></button>
  <button data-open-info="Biaya"><span>Rp</span><b>Biaya</b><span>›</span></button>
  <button data-open-info="Waktu proses"><span>◴</span><b>Waktu Proses</b><span>›</span></button>
  <button data-open-info="Hal yang perlu diperhatikan"><span>!</span><b>Hal yang Perlu Diperhatikan</b><span>›</span></button>
 </div>
 <button class="primary blue" style="width:100%;margin-top:12px" data-view="checklist">✓ Mulai Cek Kesiapan</button>
 <div class="footer">Informasi contoh untuk prototype. Pastikan verifikasi dengan petugas/kanal resmi.</div>`;
}
function passportSVG(id){
 const red=id==="hilang"||id==="rusak";
 return `<svg class="passport-svg" viewBox="0 0 160 190"><rect x="20" y="10" width="120" height="170" rx="9" fill="${red?"#d93636":"#0757a9"}"/><rect x="29" y="19" width="102" height="152" rx="5" fill="${red?"#e84b4b":"#0b66bf"}"/><circle cx="80" cy="58" r="19" fill="#e6c44b"/><path d="M80 41l5 9 11 1-8 8 2 11-10-5-10 5 2-11-8-8 11-1z" fill="#fff2a2"/><text x="80" y="94" fill="#fff" text-anchor="middle" font-size="9" font-family="Arial">REPUBLIK INDONESIA</text><text x="80" y="109" fill="#fff" text-anchor="middle" font-size="8" font-family="Arial">PASPOR</text><text x="80" y="142" fill="#fff" text-anchor="middle" font-size="8" font-family="Arial">${red?"PERHATIAN":"PASPOR WNI"}</text></svg>`;
}
function genericDescription(id){
 const m={
  baru:"Layanan untuk WNI yang belum pernah memiliki paspor atau akan melakukan perjalanan ke luar negeri.",
  ganti:"Penggantian paspor dapat dilakukan karena masa berlaku habis, halaman penuh, perubahan data, atau kondisi lain sesuai ketentuan.",
  rusak:"Panduan untuk paspor yang rusak. Kondisi paspor akan diperiksa oleh petugas sebelum proses penggantian.",
  anak:"Informasi layanan paspor bagi anak dengan dokumen pendukung dan pendamping sesuai ketentuan.",
  biometrik:"Foto dan sidik jari merupakan bagian dari proses pelayanan. Pastikan wajah terlihat jelas dan ikuti arahan petugas.",
  perjalanan:"Checklist sederhana sebelum perjalanan: masa berlaku, visa bila diperlukan, tiket, dokumen pendukung, dan aturan negara tujuan.",
  lainnya:"Informasi umum dan pintasan menuju layanan lain yang tersedia pada prototype SAPA FIND."
 };
 return m[id]||"Informasi layanan keimigrasian yang dapat membantu pemohon memahami dokumen, tahapan, biaya, dan hal yang perlu diperhatikan.";
}

function syaratDetail(){
 return `<div class="detail-head"><div class="backline"><button data-back>←</button><span>Persyaratan</span></div><h1>Checklist Dokumen</h1><p>Siapkan dokumen sebelum datang ke kantor.</p></div>
 <div class="info-card"><h3>Jenis Permohonan</h3><select id="checkType" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:10px"><option>Paspor Baru</option><option>Penggantian Paspor</option><option>Paspor Anak</option><option>Paspor Hilang</option></select></div>
 <div class="section-head"><h2>Dokumen utama</h2><span id="count" class="pill">0 dari 6 siap</span></div>
 <div id="checks" class="list">${["KTP Elektronik","Kartu Keluarga","Akta Kelahiran / Ijazah / Buku Nikah","Paspor Lama (jika ada)","Surat Pewarganegaraan (jika diperlukan)","Dokumen Pendukung Lainnya"].map((x,i)=>`<label class="check"><input type="checkbox" data-check> ${x}</label>`).join("")}</div>
 <div style="margin:12px 0"><div class="progress"><span id="checkProgress" style="width:0%"></span></div></div>
 <div class="notice">Lengkapi dokumen yang belum siap sebelum datang ke kantor imigrasi. Prototype ini dapat Anda sesuaikan dengan persyaratan resmi terbaru.</div>`;
}
function biayaDetail(){
 return `<div class="detail-head"><div class="backline"><button data-back>←</button><span>Informasi</span></div><h1>Biaya Paspor</h1><p>Kalkulator estimasi sederhana</p></div>
 <div class="info-card"><h3>Jenis Paspor</h3><div class="chips"><button class="chip priceType active">Paspor Biasa</button><button class="chip priceType">Paspor Elektronik</button></div><h3 style="margin-top:14px">Masa Berlaku</h3><div class="chips"><button class="chip years">5 Tahun</button><button class="chip years active">10 Tahun</button></div></div>
 <div class="info-card" style="margin-top:10px"><div class="price">Rp 650.000<small>Contoh estimasi · sesuaikan dengan tarif resmi</small></div><hr style="border:0;border-top:1px solid var(--line)"><p><b>Rincian</b></p><p>PNBP Paspor <span style="float:right">Rp 650.000</span></p><p><b>Total</b> <span style="float:right"><b>Rp 650.000</b></span></p></div>
 <div class="notice warn" style="margin-top:10px">Tarif dapat berubah sesuai ketentuan yang berlaku. Jangan jadikan angka prototype sebagai sumber tarif resmi.</div>`;
}
function prosedurDetail(){
 return `<div class="detail-head"><div class="backline"><button data-back>←</button><span>Informasi</span></div><h1>Prosedur & Waktu</h1><p>Alur umum pelayanan paspor</p></div>
 <div class="timeline">${[["Pendaftaran","Online / loket sesuai mekanisme yang berlaku."],["Pemeriksaan Dokumen","Petugas melakukan verifikasi kelengkapan."],["Foto & Biometrik","Pengambilan foto dan data biometrik."],["Wawancara","Pemohon mengikuti proses wawancara."],["Pengambilan Paspor","Paspor siap diambil/dikirim sesuai layanan."]].map((x,i)=>`<div class="step" data-n="${i+1}"><strong>${x[0]}</strong><p>${x[1]}</p></div>`).join("")}</div>
 <div class="info-card"><h3>Estimasi Total</h3><div class="price">3–4 Hari Kerja<small>Contoh tampilan setelah persyaratan lengkap dan tidak ada kendala.</small></div></div>`;
}
function hilangDetail(){
 return `<div class="detail-head"><div class="backline"><button data-back>←</button><span>Layanan</span></div><h1>Paspor Hilang</h1><p>Panduan saat paspor tidak ditemukan</p></div>
 <div class="info-card"><h3>🚨 Yang Harus Dilakukan</h3><p>Segera laporkan kehilangan dan jangan membuat pernyataan yang tidak sesuai fakta. Ikuti pemeriksaan serta arahan petugas.</p></div>
 <div class="section-head"><h2>Tahapan</h2></div><div class="feature-list">
 <button data-open-info="Lapor kehilangan"><span>1</span><b>Lapor kehilangan</b><span>›</span></button>
 <button data-open-info="Pemeriksaan"><span>2</span><b>Pemeriksaan & dokumen</b><span>›</span></button>
 <button data-open-info="Penggantian"><span>3</span><b>Proses penggantian paspor</b><span>›</span></button></div>
 <div class="notice danger" style="margin-top:12px">Paspor hilang adalah kondisi khusus. Detail tindakan dan dokumen dapat ditentukan berdasarkan hasil pemeriksaan.</div>
 <button class="primary" style="width:100%;margin-top:12px" data-view="chat">💬 Tanya SAPA FIND</button>`;
}
function lokasiDetail(){
 return `<div class="detail-head"><div class="backline"><button data-back>←</button><span>Informasi</span></div><h1>Lokasi Pelayanan</h1><p>Kantor Imigrasi Selatpanjang</p></div>
 <div class="info-card"><h3>Kantor Imigrasi Kelas II TPI Selatpanjang</h3><p>Jl. Dorak, Selatpanjang, Kec. Tebing Tinggi, Kab. Kep. Meranti, Riau 28753</p><div class="chips"><button class="chip" id="mapsBtn">📍 Buka di Google Maps</button><button class="chip" id="dirBtn">🧭 Petunjuk Arah</button></div></div>
 <div class="location-map"><div class="road"></div><div class="road r2"></div><div class="pin">📍</div></div>
 <div class="info-card" style="margin-top:10px"><h3>Jam Layanan</h3><p><b>Senin–Jumat</b> · 08.00–15.30 WIB</p><p><b>Istirahat</b> · 12.00–13.00 WIB</p><p class="notice warn">Jam layanan pada prototype adalah contoh. Sesuaikan dengan jadwal resmi kantor.</p></div>`;
}
function faqView(){
 const faqs=[
 ["Apakah anak harus datang saat membuat paspor?","Kebutuhan kehadiran anak mengikuti jenis layanan dan ketentuan yang berlaku. Gunakan informasi resmi terbaru atau tanyakan petugas."],
 ["Apakah paspor lama harus dibawa?","Untuk penggantian paspor, paspor lama biasanya menjadi dokumen penting. Bawa dokumen asli yang diminta dan ikuti arahan petugas."],
 ["Apa yang harus dilakukan jika paspor hilang?","Segera laporkan kehilangan dan ikuti pemeriksaan. Jangan menunda laporan."],
 ["Berapa biaya membuat paspor?","Tarif bergantung pada jenis paspor dan layanan. Gunakan angka pada prototype hanya sebagai contoh dan verifikasi tarif terbaru."],
 ["Berapa lama proses pembuatan paspor?","Waktu proses dapat berbeda berdasarkan layanan dan kondisi permohonan. Prototype menampilkan contoh 3–4 hari kerja."],
 ["Apakah bisa mengurus paspor di luar domisili KTP?","Kebijakan layanan dapat berubah. Pastikan mengecek mekanisme terbaru sebelum datang."]
 ];
 return `<div class="section-head"><h2>Pertanyaan Populer</h2></div><div class="list">${faqs.map((f,i)=>`<div class="faq-item"><button class="faq-q">${f[0]} <span>⌄</span></button><div class="faq-a">${f[1]}</div></div>`).join("")}</div>
 <button class="primary blue" style="width:100%;margin-top:12px" data-view="chat">💬 Tanyakan ke SAPA FIND</button>`;
}
function checklistView(){return syaratDetail()}
function chatView(){
 return `<div class="section-head"><h2>Chat SAPA FIND</h2><span class="online"><i></i> Online</span></div>
 <div class="chat" id="chatBox">
  <div class="bubble bot">👋 <b>Halo! Saya SAPA FIND.</b><br>Asisten Informasi Layanan Keimigrasian Imigrasi Selatpanjang.<br><br>Ada yang ingin Anda tanyakan?</div>
  <div class="chips" id="quickChips"><button class="chip" data-q="Syarat paspor baru apa saja?">Syarat paspor baru</button><button class="chip" data-q="Berapa biaya paspor?">Biaya paspor</button><button class="chip" data-q="Paspor saya hilang">Paspor hilang</button><button class="chip" data-q="Lokasi kantor">Lokasi kantor</button></div>
 </div>
 <div class="chat-input"><input id="chatInput" placeholder="Ketik pertanyaan Anda..."><button class="send" id="sendBtn">➤</button></div>`;
}
function accountView(){
 return `<div class="section-head"><h2>Akun & Bantuan</h2></div>
 <div class="info-card"><h3>👤 SAPA FIND</h3><p>Asisten informasi keimigrasian untuk membantu pemohon memahami layanan secara lebih sederhana.</p></div>
 <div class="section-head"><h2>Pintasan</h2></div><div class="list">
 <button class="list-item" data-view="faq"><div class="li-ico">?</div><div><strong>Pusat FAQ</strong><small>Pertanyaan yang sering ditanyakan</small></div><span class="arrow">›</span></button>
 <button class="list-item" data-view="location"><div class="li-ico">●</div><div><strong>Lokasi Pelayanan</strong><small>Alamat dan jam layanan</small></div><span class="arrow">›</span></button>
 <button class="list-item" data-view="checklist"><div class="li-ico">✓</div><div><strong>Checklist Dokumen</strong><small>Cek kesiapan permohonan</small></div><span class="arrow">›</span></button>
 </div>
 <div class="footer"><b>SAPA FIND v2.0.0</b><br>Prototype untuk pengembangan layanan informasi.</div>`;
}

function searchView(q=""){
 const found=services.filter(s=>(s.name+" "+s.desc).toLowerCase().includes(q.toLowerCase()));
 return `<div class="section-head"><h2>Hasil Pencarian</h2></div><div class="search"><input id="searchInput" value="${esc(q)}" placeholder="Cari informasi..."><button id="runSearch">Cari</button></div>
 <p style="font-size:10px;color:var(--muted)">Menampilkan ${found.length} hasil untuk “${esc(q)}”</p>
 <div class="list">${found.map(s=>`<button class="list-item" data-service="${s.id}">${iconService(s)}<div><strong>${s.name}</strong><small>${s.desc}</small></div><span class="arrow">›</span></button>`).join("") || `<div class="info-card"><h3>Belum ditemukan</h3><p>Coba kata kunci seperti “paspor”, “hilang”, “biaya”, atau “prosedur”.</p></div>`}</div>`;
}

function render(view=state.view){
 state.view=view; state.detail=null;
 const screen=document.getElementById("screen");
 const map={home,services:servicesView,faq:faqView,chat:chatView,account:accountView,checklist:checklistView,location:lokasiDetail};
 screen.innerHTML=map[view]?map[view]():home();
 document.querySelectorAll("#bottomNav button").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 document.getElementById("backBtn").style.visibility=view==="home"?"hidden":"visible";
 window.scrollTo({top:0,behavior:"smooth"});
 bind();
}

function renderDetail(id){state.history.push(state.view);state.detail=id;document.getElementById("screen").innerHTML=detail(id);document.querySelectorAll("#bottomNav button").forEach(b=>b.classList.remove("active"));document.getElementById("backBtn").style.visibility="visible";window.scrollTo({top:0,behavior:"smooth"});bind()}
function sendMessage(text){
 const box=document.getElementById("chatBox"); if(!box)return;
 const user=document.createElement("div");user.className="bubble user";user.textContent=text;box.appendChild(user);
 const low=text.toLowerCase();let ans="Saya bisa membantu informasi tentang paspor baru, penggantian, paspor hilang/rusak, biaya, persyaratan, prosedur, lokasi, dan FAQ.";
 if(low.includes("syarat")||low.includes("dokumen")) ans=answers.syarat;
 else if(low.includes("hilang")) ans=answers.hilang;
 else if(low.includes("biaya")||low.includes("harga")||low.includes("tarif")) ans=answers.biaya;
 else if(low.includes("prosedur")||low.includes("cara")||low.includes("lama")||low.includes("waktu")) ans=answers.prosedur;
 else if(low.includes("lokasi")||low.includes("alamat")||low.includes("kantor")) ans=answers.lokasi;
 const bot=document.createElement("div");bot.className="bubble bot";bot.innerHTML=ans;box.appendChild(bot);box.parentElement.scrollTop=box.parentElement.scrollHeight;
}
function bind(){
 document.querySelectorAll("[data-view]").forEach(el=>el.onclick=()=>render(el.dataset.view));
 document.querySelectorAll("[data-service]").forEach(el=>el.onclick=()=>renderDetail(el.dataset.service));
 document.querySelectorAll("[data-back]").forEach(el=>el.onclick=()=>render(state.history.pop()||"services"));
 document.querySelectorAll(".faq-q").forEach(q=>q.onclick=()=>q.parentElement.classList.toggle("open"));
 document.querySelectorAll("[data-faq]").forEach(el=>el.onclick=()=>{render("faq");setTimeout(()=>{const x=[...document.querySelectorAll(".faq-q")].find(q=>q.textContent.includes(el.dataset.faq));if(x)x.parentElement.classList.add("open")},50)});
 document.querySelectorAll("[data-open-info]").forEach(el=>el.onclick=()=>openModal(el.dataset.openInfo));
 const checks=document.querySelectorAll("[data-check]"); if(checks.length){const update=()=>{let n=[...checks].filter(x=>x.checked).length;document.getElementById("count").textContent=`${n} dari ${checks.length} siap`;document.getElementById("checkProgress").style.width=(n/checks.length*100)+"%"};checks.forEach(x=>x.onchange=update)}
 const sb=document.getElementById("sendBtn"),ci=document.getElementById("chatInput"); if(sb&&ci){sb.onclick=()=>{const v=ci.value.trim();if(v){sendMessage(v);ci.value=""}};ci.onkeydown=e=>{if(e.key==="Enter")sb.click()}}
 document.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>sendMessage(b.dataset.q));
 const hs=document.getElementById("homeSearch"), hb=document.getElementById("searchBtn"); if(hs&&hb)hb.onclick=()=>{const q=hs.value.trim(); if(q){document.getElementById("screen").innerHTML=searchView(q); bind();}};
 if(hs)hs.onkeydown=e=>{if(e.key==="Enter"){const q=hs.value.trim();if(q){document.getElementById("screen").innerHTML=searchView(q);bind()}}};
 const ss=document.getElementById("serviceSearch"),sbtn=document.getElementById("serviceSearchBtn"); if(ss&&sbtn){sbtn.onclick=()=>{const q=ss.value.toLowerCase();document.getElementById("serviceGrid").innerHTML=serviceGrid(services.filter(s=>(s.name+" "+s.desc).toLowerCase().includes(q)));bind()};}
 const ri=document.getElementById("searchInput"),rb=document.getElementById("runSearch");if(ri&&rb)rb.onclick=()=>{document.getElementById("screen").innerHTML=searchView(ri.value);bind()};
 const maps=document.getElementById("mapsBtn");if(maps)maps.onclick=()=>window.open("https://www.google.com/maps/search/?api=1&query=Kantor+Imigrasi+Selatpanjang","_blank");
 const dir=document.getElementById("dirBtn");if(dir)dir.onclick=()=>window.open("https://www.google.com/maps/dir/?api=1&destination=Kantor+Imigrasi+Selatpanjang","_blank");
 document.querySelectorAll(".priceType,.years").forEach(x=>x.onclick=()=>{x.parentElement.querySelectorAll("button").forEach(b=>b.classList.remove("active"));x.classList.add("active");toast("Pilihan diperbarui")});
}
function openModal(title){
 const body=document.getElementById("modalBody");
 const map={Syarat:answers.syarat,Prosedur:answers.prosedur,Biaya:answers.biaya,"Waktu proses":"Estimasi waktu dapat berbeda sesuai layanan dan kondisi permohonan. Prototype menampilkan contoh 3–4 hari kerja.","Lapor kehilangan":"Segera laporkan kehilangan dan ikuti arahan petugas.","Pemeriksaan":"Petugas akan memeriksa kronologi dan dokumen pendukung.","Penggantian":"Setelah pemeriksaan, ikuti prosedur penggantian sesuai arahan petugas.","Hal yang perlu diperhatikan":"Pastikan data benar, dokumen asli tersedia, dan informasi terbaru sudah diverifikasi."};
 body.innerHTML=`<h2>${esc(title)}</h2><div class="info-card">${map[title]||"Informasi tersedia pada modul SAPA FIND."}</div>`;
 document.getElementById("modal").hidden=false;
}
document.getElementById("modalClose").onclick=()=>document.getElementById("modal").hidden=true;
document.getElementById("modal").onclick=e=>{if(e.target.id==="modal")document.getElementById("modal").hidden=true};
document.getElementById("helpBtn").onclick=()=>openModal("Bantuan");
document.getElementById("backBtn").onclick=()=>{if(state.detail){render(state.history.pop()||"services")}else render("home")};
setTimeout(()=>document.getElementById("splash").classList.add("hide"),900);
render("home");
