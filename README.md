# EFC – École de Formation des Cadres
## Guide d'installation du site web

### Fichiers inclus
- `index.html` — Page principale du site
- `style.css` — Design et mise en page
- `script.js` — Interactions et animations

---

### Pour utiliser avec WordPress

Ce site est livré en HTML/CSS/JS pur. Pour l'intégrer à WordPress :

**Option 1 – Thème WordPress personnalisé (recommandé)**
1. Créez un dossier `efc-theme` dans `wp-content/themes/`
2. Copiez `index.html` → renommez en `index.php`
3. Copiez `style.css` et `script.js` dans le même dossier
4. Ajoutez en tête de `style.css` :
   ```
   /*
   Theme Name: EFC Theme
   Description: Thème officiel EFC
   Version: 1.0
   */
   ```
5. Activez le thème depuis le tableau de bord WordPress

**Option 2 – Plugin Page Builder**
- Utilisez Elementor ou WPBakery et importez le contenu manuellement

---

### Ajouter vos photos

1. Créez un dossier `images/` à côté de `index.html`
2. Placez vos photos avec ces noms :
   - `ceremony1.jpg` — Photo principale de cérémonie
   - `ceremony2.jpg` à `ceremony5.jpg` — Photos secondaires

---

### Informations du site
- **École** : EFC – École de Formation des Cadres
- **Adresse** : 12 Rue de Grèce, Tunis 1002
- **Tél** : 22 999 213 · 25 131 052 · 50 874 106 · 29 769 773
- **N° enregistrement** : 09.986.11-1
- **Formations** : BTS (5 spécialités) + BTP (4 spécialités)
