#!/bin/bash
# QR-Code Generator - Build, Push & Deploy
# Usage: bash deploy.sh "commit message"

set -e
cd "$(dirname "$0")"

MSG="${1:-Update}"

echo "🔨 Building..."
npm run build 2>&1 | tail -3

echo "📦 Copying to Portal preview..."
cp -r dist/* /home/bahadir/production-system/static/websites/qrcode-no-abo/

echo "🚀 Pushing to GitHub..."
git add -A
git commit -m "$MSG" 2>/dev/null || echo "Nothing to commit"
git push 2>&1 | tail -3

echo "🧹 Purging Cloudflare cache..."
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/e607cf7687895d0b7ae20920319d54eb/purge_cache" \
  -H "X-Auth-Email: b@erguellue.de" \
  -H "X-Auth-Key: 42b2b4e0d55d0deec7a21b65a321029e36b27" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}' | python3 -c "import sys,json; d=json.load(sys.stdin); print('✅ Cache purged!' if d['success'] else '❌ ' + str(d['errors']))"

echo ""
echo "✅ Deploy complete! GitHub Action builds & deploys automatically."
echo "🌐 https://qrcode-no-abo.de"
