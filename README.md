🔥 Perfect. This is a **premium spiritual dark UI** style.
Let’s break it down properly and give you a **production-ready setup + exact theme system**.

You want:

* 🌌 Deep cosmic dark background
* 💎 Soft glowing teal accents
* ✨ Elegant typography
* 🟢 Glassmorphism cards
* 🔥 Premium feel

I’ll give you the **exact setup + color system + theme tokens**.

---

# 🚀 1️⃣ Correct Production Setup (Expo + NativeWind + Router)

You should have:

```bash
expo
expo-router
nativewind
react-native-safe-area-context
react-native-reanimated
react-native-svg
expo-linear-gradient
expo-blur
zustand
```

Install missing ones:

```bash
npx expo install expo-linear-gradient expo-blur react-native-svg react-native-reanimated
npm install zustand
```

---

# 🎨 2️⃣ Exact Color System (Matched To Your Screenshot)

This UI uses:

* Very deep navy background
* Cyan/teal glow accents
* Soft muted gray text
* Subtle glass borders

---

## 🌌 PRIMARY BACKGROUND

```js
#0B1020
```

Gradient background:

```js
#0B1020 → #111827 → #0F172A
```

---

## ✨ ACCENT TEAL GLOW

```js
Primary Teal: #2DD4BF
Soft Teal: #14B8A6
Glow Teal: #5EEAD4
```

---

## 💎 CARD BACKGROUND (Glass Look)

```js
Card: #111827
Border: rgba(255,255,255,0.06)
```

---

## 📝 TEXT COLORS

```js
Primary Text: #F8FAFC
Secondary Text: #94A3B8
Muted Text: #64748B
```

---

# 🧠 3️⃣ Update Your `tailwind.config.js`

Replace it with this:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1020",
        card: "#111827",
        primary: "#2DD4BF",
        primarySoft: "#14B8A6",
        glow: "#5EEAD4",
        textPrimary: "#F8FAFC",
        textSecondary: "#94A3B8",
        textMuted: "#64748B",
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};
```

Restart with:

```bash
npx expo start -c
```

---

# 💎 4️⃣ How To Create That Glow Effect

Use:

```js
shadowColor: "#2DD4BF",
shadowOpacity: 0.4,
shadowRadius: 20,
shadowOffset: { width: 0, height: 0 },
elevation: 10
```

Or better → use `expo-blur` + gradient.

---

# 🌈 5️⃣ Background Gradient Setup

Install:

```bash
npx expo install expo-linear-gradient
```

Then:

```js
import { LinearGradient } from "expo-linear-gradient";

<LinearGradient
  colors={["#0B1020", "#111827", "#0F172A"]}
  className="flex-1"
>
  {/* content */}
</LinearGradient>
```

---

# ✨ 6️⃣ Glass Card Example (Like Screenshot)

```js
<View className="bg-card rounded-2xl p-5 border border-white/5">
  <Text className="text-textPrimary text-lg">
    Today’s Cosmic Energy
  </Text>
  <Text className="text-textSecondary mt-2">
    Ekadashi · Rohini · Mercury Retrograde
  </Text>
</View>
```

---

# 🧘 7️⃣ Emoji Card Grid Style

```js
<View className="w-[45%] bg-card rounded-2xl p-6 items-center border border-white/5 mb-4">
  <Text className="text-4xl">✨</Text>
  <Text className="text-textSecondary mt-2">Inspired</Text>
</View>
```

Use `flex-wrap` + `justify-between`.

---

# 🔥 8️⃣ Premium Font Pairing (Important)

To match elegance:

Use:

* Headline → `Playfair Display` or `Cormorant`
* Body → `Inter`

Install:

```bash
npx expo install expo-font
```

Download fonts and load them.

This makes UI look 10x more premium.

---

# 🧠 9️⃣ UI Architecture (Professional)

Structure:

```
app/
  _layout.tsx
  index.tsx
  practice.tsx
  cosmic.tsx
components/
  Card.tsx
  MoodCard.tsx
  GlowButton.tsx
  Header.tsx
theme/
  colors.ts
  spacing.ts
store/
  useMoodStore.ts
```

---

# 🎯 10️⃣ To Match EXACT Premium Feel

You must:

✔ Use blur overlays
✔ Use gradient background
✔ Use 18–22px rounded corners
✔ Keep spacing large (padding-5 or 6)
✔ Avoid pure black
✔ Use soft teal glow
✔ Keep text slightly muted

---

# 🚀 Final Result

You will get:

* 🌌 Calm spiritual dark theme
* ✨ Teal glowing accents
* 💎 Glass cards
* 📱 Modern iOS + Android look
* 🔥 Premium startup-level UI

---

If you want next, I can:

* Build you exact home screen layout code
* Create reusable mood grid component
* Create full theme file
* Help you implement bottom tab navigation like screenshot
* Help you animate glow effects

Tell me what you want next 👌
