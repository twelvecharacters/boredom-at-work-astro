# Deployment Guide: boredom-at-work.com

## Schritt 1: GitHub Repository erstellen

### Option A: Über GitHub.com (empfohlen)

1. Gehe zu https://github.com/new
2. Repository Name: `boredom-at-work-astro`
3. Visibility: Private (oder Public)
4. **NICHT** "Initialize with README" auswählen
5. Klicke "Create repository"

Nach dem Erstellen zeigt GitHub die Remote-URL an. Führe dann diese Befehle aus:

```bash
cd /Users/mehdivazirian/boredom-at-work-astro
git remote add origin https://github.com/DEIN-USERNAME/boredom-at-work-astro.git
git push -u origin master
```

### Option B: Mit GitHub CLI

```bash
brew install gh
gh auth login
gh repo create boredom-at-work-astro --private --source=. --push
```

---

## Schritt 2: Netlify einrichten

1. Gehe zu https://app.netlify.com
2. Klicke "Add new site" → "Import an existing project"
3. Wähle "GitHub" als Git provider
4. Autorisiere Netlify für dein GitHub-Konto
5. Wähle das Repository `boredom-at-work-astro`
6. Build-Einstellungen werden automatisch erkannt (aus netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Klicke "Deploy site"

Netlify erstellt automatisch eine temporäre URL wie `random-name-12345.netlify.app`.

---

## Schritt 3: Custom Domain bei Netlify hinzufügen

1. In Netlify: Site settings → Domain management
2. Klicke "Add custom domain"
3. Gib ein: `boredom-at-work.com`
4. Klicke "Verify" → "Add domain"
5. Netlify fügt automatisch auch `www.boredom-at-work.com` hinzu

---

## Schritt 4: DNS-Umstellung

### Bei deinem Domain-Registrar (z.B. Namecheap, GoDaddy, etc.)

**DNS-Records ändern:**

| Typ   | Host | Wert                          |
|-------|------|-------------------------------|
| A     | @    | 75.2.60.5                     |
| CNAME | www  | [deine-site].netlify.app      |

**Alternativ: Netlify DNS nutzen (empfohlen)**

1. In Netlify: Domain settings → "Set up Netlify DNS"
2. Netlify zeigt dir 4 Nameserver an, z.B.:
   - dns1.p01.nsone.net
   - dns2.p01.nsone.net
   - dns3.p01.nsone.net
   - dns4.p01.nsone.net
3. Bei deinem Domain-Registrar: Nameserver auf diese 4 ändern
4. Warte 24-48 Stunden für DNS-Propagation

---

## Schritt 5: SSL/HTTPS aktivieren

Netlify aktiviert automatisch ein Let's Encrypt SSL-Zertifikat, sobald die DNS-Einstellungen propagiert sind.

1. Gehe zu: Site settings → Domain management → HTTPS
2. Klicke "Verify DNS configuration"
3. Wenn DNS korrekt ist: "Provision certificate"
4. Aktiviere "Force HTTPS" für automatische Weiterleitungen

---

## Checkliste vor DNS-Umstellung

- [ ] Site auf Netlify deployed und erreichbar unter `*.netlify.app`
- [ ] Alle Seiten funktionieren korrekt
- [ ] Alle Bilder werden geladen
- [ ] Links funktionieren
- [ ] Mobile Ansicht getestet
- [ ] Google Analytics funktioniert (prüfe in GA4)
- [ ] robots.txt erreichbar unter `/robots.txt`
- [ ] Sitemap erreichbar unter `/sitemap-index.xml`

---

## Nach der DNS-Umstellung

1. **Google Search Console aktualisieren**
   - Property bestätigen (falls neu)
   - Sitemap einreichen: `https://boredom-at-work.com/sitemap-index.xml`

2. **Google Analytics prüfen**
   - Echtzeit-Berichte auf Tracking prüfen

3. **WordPress abschalten**
   - Hosting kündigen oder Site offline nehmen
   - Backup behalten!

---

## Rollback-Plan

Falls Probleme auftreten:

1. DNS-Records zurück auf alte WordPress-Hosting-IP ändern
2. Oder: WordPress-Backup auf neuem Host wiederherstellen

---

## Technische Details

- **Build-Zeit:** ~2 Sekunden
- **Generierte Seiten:** 12
- **Node-Version:** 20
- **Framework:** Astro 5
- **CSS:** Tailwind CSS 4
- **Analytics:** GA4 (GT-PL3RVFQX)
