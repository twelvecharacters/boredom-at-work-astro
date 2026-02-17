---
title: "3D Print Not Sticking to Bed? Every Fix You Need"
slug: "3d-print-not-sticking-fixes"
description: "First layer keeps failing? Here's every reason your 3D print won't stick to the bed and how to fix it—from bed leveling to adhesion helpers."
publishDate: 2026-02-24
author: "bored chap"
image: "/images/3d-print-not-sticking-fixes.webp"
tags: ["3D Printing", "Troubleshooting", "First Layer", "Bed Adhesion", "Tutorial"]
draft: false
faq:
  - question: "Why does my first layer keep peeling up?"
    answer: "Usually it's one of three things: bed not level (nozzle too far), bed temperature too low, or a dirty/oily build surface. Start by re-leveling your bed and cleaning it with isopropyl alcohol."
  - question: "What temperature should my bed be for PLA?"
    answer: "50-60°C works for most PLA. If you're having adhesion issues, try 65°C. Some PLAs stick fine to a cold bed if you're using a textured PEI sheet."
  - question: "Is glue stick safe to use on a PEI bed?"
    answer: "Yes, and it's actually recommended for PETG on PEI. The glue acts as a release agent, preventing PETG from bonding too strongly and damaging your bed. For PLA, glue stick helps on glass beds."
  - question: "How do I know if my bed is level?"
    answer: "The paper test: slide a piece of paper between the nozzle and bed at each corner and center. You should feel slight resistance when pulling the paper. If it slides freely, the nozzle is too high. If it won't move, too low."
  - question: "Why does my print stick in the middle but not the corners?"
    answer: "Your bed is likely warped (very common) or not properly leveled at all points. Try using a mesh bed leveling feature if your printer supports it, or focus prints in the center of the bed."
  - question: "Should I use a raft or brim for better adhesion?"
    answer: "A brim is usually better—it adds surface area around your print's base without wasting as much material as a raft. Use a raft only as a last resort for severely warped beds or very small contact areas."
tldr: "Clean your bed with IPA, re-level it, slow down the first layer to 20mm/s, and increase bed temp by 5-10°C. If that doesn't work, add a brim or use glue stick/hairspray. 90% of adhesion problems are solved by proper leveling and a clean bed."
---

You hit print, walk away excited, and come back to find a bird's nest of filament where your print should be. The first layer didn't stick.

**Don't panic.** This is the most common 3D printing problem, and it's almost always fixable.

In this guide, I'll walk you through every cause of bed adhesion failure and how to fix each one—from the obvious (dirty bed) to the subtle (wrong z-offset by 0.05mm).

## Why First Layer Adhesion Matters

The first layer is the foundation of your entire print. If it fails:
- Small parts detach and get dragged around
- Corners lift (warping)
- The whole print eventually fails

**The good news:** Once you nail first layer adhesion, most prints just work.

---

## The Quick Fix Checklist

Try these in order before diving deeper:

- [ ] **Clean your bed** with isopropyl alcohol (90%+)
- [ ] **Re-level your bed** using the paper method
- [ ] **Slow first layer** to 20mm/s
- [ ] **Increase bed temp** by 5-10°C
- [ ] **Decrease nozzle-to-bed distance** slightly (0.05mm)

This fixes 80% of adhesion problems. If not, keep reading.

---

## Cause #1: Dirty or Oily Build Surface

**The problem:** Oils from your fingers, dust, or residue from previous prints create a slippery surface.

**Symptoms:**
- Print starts fine, then suddenly detaches
- First layer looks good but won't stick
- Random spots where filament doesn't adhere

**The fix:**
1. Remove the build plate if possible
2. Clean with **90%+ isopropyl alcohol** and a lint-free cloth
3. For stubborn residue: warm soapy water, then IPA
4. Avoid touching the print surface with bare hands

**Pro tip:** Clean your bed before every print, or at least every few prints. It takes 30 seconds and prevents hours of failed prints.

### Deep Cleaning (Monthly)

For PEI sheets that have lost their grip:
1. Wash with dish soap and warm water
2. Lightly sand with 1000-2000 grit sandpaper (circular motions)
3. Clean with IPA
4. Your PEI will grip like new

---

## Cause #2: Bed Not Level (Nozzle Too Far)

**The problem:** If the nozzle is too far from the bed, the filament doesn't get "squished" enough to bond.

**Symptoms:**
- First layer lines are round, not flat
- Filament doesn't stick, just sits on the surface
- Lines don't connect to each other
- You can easily peel off the first layer

**The fix: The Paper Method**

1. Home your printer (X, Y, Z)
2. Disable steppers so you can move the head manually
3. Move nozzle to front-left corner
4. Slide paper between nozzle and bed
5. Adjust the corner until you feel **slight resistance** when pulling the paper
6. Repeat for front-right, back-right, back-left, and center
7. Do the whole process twice (adjusting one corner affects others)

**What "slight resistance" means:**
- Paper slides with light friction = perfect
- Paper slides freely = nozzle too high (lower it)
- Paper won't move / tears = nozzle too low (raise it)

### Automatic Bed Leveling (ABL)

If your printer has a probe (BLTouch, CR Touch, inductive), use it:
1. Run the bed leveling routine
2. Save the mesh to EEPROM
3. Ensure your slicer adds `G29` after `G28` in the start G-code

ABL compensates for warped beds but doesn't replace proper tramming.

---

## Cause #3: Nozzle Too Close to Bed

**The problem:** If the nozzle is too close, filament can't extrude properly.

**Symptoms:**
- Very thin or no filament on first layer
- Nozzle scrapes the bed (bad sounds)
- Filament builds up around the nozzle
- First layer is transparent or has gaps

**The fix:**
- Raise the nozzle slightly (0.05mm at a time)
- Re-level with less paper resistance
- Adjust z-offset in firmware or slicer

---

## Cause #4: Bed Temperature Too Low

**The problem:** The bed isn't warm enough to keep the plastic soft at the contact point.

**Symptoms:**
- Corners lift after a few layers (warping)
- Print pops off suddenly during print
- Adhesion fine in center, fails at edges

**Recommended bed temperatures:**

| Material | Bed Temp | If Issues |
|----------|----------|-----------|
| PLA | 50-60°C | Try 65°C |
| PETG | 70-80°C | Try 85°C |
| ABS | 100-110°C | Ensure enclosure |
| TPU | 40-50°C | Or room temp |

**The fix:**
- Increase bed temp by 5-10°C
- Wait for bed to fully heat before printing (give it 2-3 extra minutes)
- Check if your bed temp is accurate (cheap thermometer test)

---

## Cause #5: First Layer Too Fast

**The problem:** The first layer needs time to bond. Printing too fast doesn't give it a chance.

**Symptoms:**
- First layer looks rushed or messy
- Corners don't stick down
- Works sometimes, fails randomly

**The fix:**
- Set first layer speed to **20-25mm/s**
- In Cura: "Initial Layer Speed"
- In PrusaSlicer: "First layer speed"

Slower = more time to bond = better adhesion.

---

## Cause #6: First Layer Too Thin or Thick

**The problem:** The first layer height affects how well it squishes into the bed.

**Symptoms:**
- Very thin first layer = not enough material
- Very thick first layer = not enough squish

**The fix:**
- Use **0.2-0.3mm first layer height** (even if using 0.1mm for rest of print)
- In Cura: "Initial Layer Height"
- Higher first layer = more forgiving for imperfect leveling

---

## Cause #7: Wrong Build Surface for Material

Different surfaces work better with different materials:

| Surface | Best For | Avoid |
|---------|----------|-------|
| **PEI (smooth)** | PLA, ABS | PETG (sticks too well) |
| **PEI (textured)** | PETG, PLA | — |
| **Glass** | PLA (with glue) | PETG, ABS |
| **BuildTak** | PLA, ABS | PETG |
| **Magnetic flex plates** | Varies | Check manufacturer |

**PETG on smooth PEI warning:** PETG bonds so strongly to smooth PEI that it can rip chunks out of your bed. Use glue stick as a release agent, or switch to textured PEI.

---

## Cause #8: Warped Bed

**The problem:** Many beds aren't perfectly flat—they're higher in the middle or have low corners.

**Symptoms:**
- Perfect adhesion in some spots, none in others
- Works great in center, fails at corners
- Inconsistent results across the bed

**The fixes:**

1. **Manual mesh leveling:** Level at 9-25 points instead of just 4 corners
2. **ABL probe:** Install a BLTouch/CR Touch if you don't have one
3. **Glass bed:** Add a piece of borosilicate glass (much flatter than aluminum)
4. **Print in the center:** Avoid edges of the bed

---

## Cause #9: Drafts and Temperature Fluctuations

**The problem:** Cold air hits the print, causing rapid cooling and warping.

**Symptoms:**
- One side of print lifts more than others
- Issues worse in winter or with AC
- Works fine with small prints, fails with large ones

**The fix:**
- Move printer away from windows, doors, AC vents
- Build an enclosure (even cardboard helps)
- Close the room door during printing

---

## Adhesion Helpers (When All Else Fails)

Sometimes you need extra help. Here are your options:

### Glue Stick

**How:** Apply thin, even layer to bed before printing. Reapply every few prints.

**Pros:**
- Cheap and available everywhere
- Works great for PLA on glass
- Acts as release agent for PETG on PEI

**Cons:**
- Needs reapplication
- Makes bed cleanup necessary

**Recommended:** Elmer's Purple Glue Stick (dries clear)

### Hairspray

**How:** Light spray on bed, let dry before printing.

**Pros:**
- Thin, even coating
- Works well for ABS

**Cons:**
- Overspray gets everywhere
- Strong smell
- Can gum up over time

**Recommended:** Aqua Net (unscented if possible)

### Painter's Tape (Blue Tape)

**How:** Apply strips to bed, overlapping slightly.

**Pros:**
- Cheap and easy
- Great for PLA
- No bed heating needed

**Cons:**
- Needs replacement often
- Can leave residue
- Texture shows on bottom of print

### Commercial Adhesives

- **Magigoo:** Made for 3D printing, works great, expensive
- **3DLac:** Spray adhesive, popular in Europe
- **Vision Miner Nano Polymer:** Professional grade

---

## Brims and Rafts

When surface adhesion isn't enough, add more surface area:

### Brim

**What:** Extra lines around the base of your print, attached to it.

**When to use:**
- Tall, thin prints
- Small contact area
- Slight adhesion issues

**Settings:**
- Brim width: 8-15mm
- Brim lines: 10-20

**Pros:** Uses minimal material, easy to remove
**Cons:** Leaves slight edge to clean up

### Raft

**What:** Full platform printed under your model.

**When to use:**
- Severely warped beds
- Very small contact areas
- When nothing else works

**Settings:**
- Raft air gap: 0.2-0.3mm (for easier removal)

**Pros:** Maximum adhesion, compensates for bad beds
**Cons:** Wastes material, rough bottom surface, hard to remove

**Recommendation:** Always try a brim first. Rafts are a last resort.

---

## First Layer Settings Cheat Sheet

Copy these settings for reliable first layers:

```
First Layer Height: 0.2-0.3mm (even for 0.12mm layer height prints)
First Layer Speed: 20-25mm/s
First Layer Flow: 100-105%
First Layer Width: 120% of nozzle diameter

Bed Temperature:
- PLA: 60°C
- PETG: 80°C
- ABS: 100°C

Initial Fan Speed: 0% (let first layers bond without cooling)
```

---

## Troubleshooting Decision Tree

**Print doesn't stick at all:**
1. Clean bed with IPA
2. Re-level bed (paper method)
3. Decrease nozzle distance (z-offset -0.05mm)
4. Increase bed temp +10°C

**Print starts sticking, then lifts:**
1. Slow first layer speed
2. Add brim
3. Check for drafts
4. Increase bed temp

**Print sticks in center but not corners:**
1. Bed is warped—use mesh leveling
2. Print in center of bed
3. Consider glass bed upgrade

**Print sticks too well (can't remove):**
1. Let bed cool completely
2. Use less adhesive
3. Flex the build plate
4. For PETG on PEI: use glue stick as release agent

---

## Conclusion

First layer adhesion comes down to three things:

1. **Clean surface** — IPA wipe before printing
2. **Proper distance** — Nozzle close enough to squish filament
3. **Right temperature** — Bed warm enough to keep plastic soft

Master these three, and 90% of your adhesion problems disappear.

When those aren't enough, add a brim, use glue stick, and slow things down. Save rafts for emergencies only.

Now go rescue that failed print.

---

*Want to understand your slicer better? Check out [Cura Settings for Beginners](/cura-settings-beginners/). Having issues with specific materials? Read [PLA vs PETG vs ABS](/pla-vs-petg-vs-abs/). For all our 3D printing content, see the [3D Printing Guide](/3d-printing-guide/).*
