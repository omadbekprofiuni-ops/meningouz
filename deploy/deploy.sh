#!/usr/bin/env bash
# MeningoUz — deploy skripti (MAHALLIY kompyuterdan ishga tushiriladi).
#
# Ishlatish:
#   bash deploy/deploy.sh           # build qiladi va serverga yangilaydi
#   bash deploy/deploy.sh --setup   # BIRINCHI marta: serverni to'liq sozlaydi, keyin deploy qiladi
#
# Server.mjs faqat Node ichki modullariga tayanadi — shuning uchun serverga
# faqat dist/ + server.mjs yuboriladi, u yerda npm install KERAK EMAS.
set -euo pipefail

cd "$(dirname "$0")/.."          # loyiha ildiziga o'tish
CONFIG="deploy/config.sh"

if [ ! -f "$CONFIG" ]; then
  echo "✗ $CONFIG topilmadi."
  echo "  Avval sozlamalarni yarating:"
  echo "    cp deploy/config.example.sh deploy/config.sh"
  echo "  va deploy/config.sh ichidagi qiymatlarni to'ldiring."
  exit 1
fi
# shellcheck source=/dev/null
source "$CONFIG"

SSH="ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST}"
TARGET="${SSH_USER}@${SSH_HOST}:${DEPLOY_DIR}"

echo "==> 1/4  Loyiha build qilinmoqda (mahalliy)..."
npm run build

if [ "${1:-}" = "--setup" ]; then
  echo "==> [setup]  Server birinchi marta sozlanmoqda..."
  $SSH "mkdir -p ${DEPLOY_DIR}"
  scp -P "${SSH_PORT}" deploy/server-setup.sh "${SSH_USER}@${SSH_HOST}:/tmp/meningouz-setup.sh"
  $SSH "sudo DEPLOY_DIR='${DEPLOY_DIR}' DOMAIN='${DOMAIN}' APP_PORT='${APP_PORT}' \
        CERTBOT_EMAIL='${CERTBOT_EMAIL}' bash /tmp/meningouz-setup.sh"
fi

echo "==> 2/4  Fayllar serverga yuborilmoqda (rsync)..."
# Faqat kerakli fayllar: dist/ va server.mjs
rsync -az --delete -e "ssh -p ${SSH_PORT}" \
      dist/ "${TARGET}/dist/"
rsync -az -e "ssh -p ${SSH_PORT}" \
      server.mjs "${TARGET}/server.mjs"

echo "==> 3/4  Egalik to'g'rilanmoqda va xizmat qayta ishga tushirilmoqda..."
$SSH "sudo chown -R www-data:www-data ${DEPLOY_DIR} && sudo systemctl restart meningouz"

echo "==> 4/4  Holat tekshirilmoqda..."
$SSH "systemctl is-active meningouz && echo OK" || true

echo ""
if [ -n "${DOMAIN}" ]; then
  echo "✅ Tayyor!  Sayt:  https://${DOMAIN}"
else
  echo "✅ Tayyor!  Sayt:  http://${SSH_HOST}"
fi
