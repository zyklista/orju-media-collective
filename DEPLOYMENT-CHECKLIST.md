# Domain Connection Checklist

## ✅ Quick Fix Steps (Try these first!)

### 1. Verify Vercel Deployment Status
- [ ] Go to https://vercel.com/dashboard
- [ ] Check latest deployment shows "Ready" ✓ (not "Failed" or "Building")
- [ ] Click deployment → View Build Logs (check for errors)

### 2. Check Domain Configuration in Vercel
- [ ] Go to Project → Settings → Domains
- [ ] Verify `orjumedia.com` shows ✓ Valid Configuration
- [ ] Verify `www.orjumedia.com` shows ✓ Valid Configuration
- [ ] If showing warning/error, follow Vercel's DNS instructions

### 3. Verify DNS Settings in Hostinger
```
Expected DNS Records (use YOUR values from Vercel):

Type: A
Name: @ (or blank)
Value: [IP from Vercel, e.g., 76.76.21.21]
TTL: 14400 or Automatic

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 14400 or Automatic
```
- [ ] DNS records match Vercel requirements EXACTLY
- [ ] Wait 5-30 minutes for DNS propagation

### 4. Check Build Configuration
- [ ] Framework: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Root Directory: `./` (or leave blank)

### 5. Environment Variables
- [ ] `VITE_SUPABASE_URL` is set
- [ ] `VITE_SUPABASE_ANON_KEY` is set
- [ ] All variables are in "Production" environment

### 6. Force Redeploy
- [ ] Go to Deployments tab
- [ ] Click "..." on latest deployment → Redeploy
- [ ] Wait for deployment to complete

### 7. Clear Cache & Test
- [ ] Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- [ ] Try incognito/private window
- [ ] Test: https://orjumedia.com
- [ ] Test: https://www.orjumedia.com

---

## 🔍 Advanced Troubleshooting

### Check DNS Propagation
```bash
# Check if domain resolves
nslookup orjumedia.com

# Check DNS records
dig orjumedia.com

# Check from multiple locations
https://dnschecker.org (enter: orjumedia.com)
```

### Check Browser Console
1. Open DevTools (F12)
2. Console tab → Look for errors
3. Network tab → Check failed requests
4. Check if assets (JS/CSS) load properly

### Common Issues & Fixes

**Issue: Blank white page**
- ✅ Fixed by `vercel.json` (SPA routing configuration)
- Check browser console for JS errors
- Verify `dist/index.html` exists after build

**Issue: 404 on sub-routes**
- ✅ Fixed by `vercel.json` rewrites
- Ensures all routes redirect to index.html

**Issue: DNS not resolving**
- Wait 30 minutes for DNS propagation
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Check Hostinger DNS panel for typos

**Issue: Build fails**
- Run `npm run build` locally
- Fix any TypeScript/lint errors
- Check build logs in Vercel

**Issue: Environment variables not working**
- Must start with `VITE_` prefix
- Redeploy after adding variables
- Check Variables are in "Production" environment

---

## 📞 Need Help?

1. **Check Vercel Status**: https://vercel-status.com
2. **DNS Checker**: https://dnschecker.org
3. **Vercel Docs**: https://vercel.com/docs
4. **Check Build Logs**: Vercel Dashboard → Deployments → [Your Deployment] → View Build Logs

---

## ✨ Files Created/Updated

- ✅ `vercel.json` - SPA routing & caching headers
- ✅ `DEPLOY.md` - Complete deployment guide with troubleshooting
- ✅ `DEPLOYMENT-CHECKLIST.md` - This checklist

All set! Your site should now work properly on your domain.
