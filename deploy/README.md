# MeningoUz — VPS serverga joylash (deploy)

Bu jild loyihani o'z VPS (Linux) serveringizga qo'yib, internetdan doimiy
ochiq turishi uchun zarur skriptlarni o'z ichiga oladi.

Loyiha statik SPA. `server.mjs` faqat Node ichki modullariga tayanadi —
shuning uchun **serverga npm install kerak emas**: build mahalliy kompyuterda
bo'ladi, serverga faqat `dist/` va `server.mjs` yuboriladi.

Arxitektura:
```
Internet → nginx (80/443, HTTPS) → Node server.mjs (ichki port 3000) → dist/
                                    └─ systemd doim qayta ishga tushiradi
```

---

## Talablar

- **Serveringizda:** Ubuntu/Debian Linux, SSH kirish, `sudo` huquqi.
- **Mahalliy kompyuteringizda:** `node`, `npm`, `rsync`, `ssh` (Mac'da hammasi bor).
- **Ixtiyoriy:** domen (masalan `meningouz.uz`). Domeningiz bo'lsa, DNS A-record'ini
  server IP'siga yo'naltirib qo'ying — skript avtomatik bepul HTTPS oladi.

---

## 1-qadam: sozlamalarni to'ldirish

```bash
cd meningouz-app
cp deploy/config.example.sh deploy/config.sh
```

So'ng `deploy/config.sh` ni ochib quyidagilarni yozing:
- `SSH_HOST` — server IP manzili
- `SSH_USER` — SSH foydalanuvchi (`root`, `ubuntu`, ...)
- `DOMAIN` — domeningiz (yoki bo'sh `""` qoldiring — IP orqali ishlaydi)
- `CERTBOT_EMAIL` — HTTPS uchun e-mail

> `config.sh` git'ga tushmaydi (`.gitignore`'da), ya'ni server ma'lumotlaringiz maxfiy qoladi.

---

## 2-qadam: birinchi marta — serverni sozlash + deploy

```bash
bash deploy/deploy.sh --setup
```

Bu bir buyruq:
1. Loyihani build qiladi (mahalliy),
2. Serverga Node.js + nginx o'rnatadi,
3. systemd xizmati va nginx konfiguratsiyasini yaratadi,
4. (domen bo'lsa) bepul HTTPS sertifikat oladi,
5. fayllarni yuklab, saytni ishga tushiradi.

Tugagach manzil chiqadi: `https://<domeningiz>` yoki `http://<server-ip>`.

---

## Keyingi yangilashlar

Kodga o'zgartirish kiritganingizdan keyin har safar shunchaki:

```bash
bash deploy/deploy.sh
```

(`--setup`siz — bu tezroq: faqat build qiladi, yuboradi, xizmatni qayta ishga tushiradi.)

---

## Foydali buyruqlar (serverda)

```bash
systemctl status meningouz       # holatni ko'rish
systemctl restart meningouz      # qayta ishga tushirish
journalctl -u meningouz -f       # jonli loglar
```

---

## Muammolar

- **Sayt ochilmayapti:** server firewall'ida 80 va 443 portlar ochiqligini tekshiring
  (`ufw allow 80; ufw allow 443`).
- **HTTPS olinmadi:** domen DNS A-record'i server IP'siga yo'naltirilganini tekshiring
  (`dig +short <domeningiz>` server IP'sini ko'rsatishi kerak), keyin serverda
  `sudo certbot --nginx -d <domeningiz>` ni qayta ishga tushiring.
- **"npm: command not found" (mahalliy):** Node.js o'rnating — https://nodejs.org
