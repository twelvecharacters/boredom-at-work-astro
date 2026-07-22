---
title: "PETG-CF Filament Guide 2026: Settings, Printers & When to Use It"
slug: "petg-cf-filament-guide"
description: "PETG-CF (carbon fiber PETG) is stiffer, stronger, and harder to print than regular PETG. Settings, hardware needs, and when it's worth the extra cost."
publishDate: 2026-06-12
author: "Mehdi"
image: "./12-petg-cf-filament-guide.webp"
imageAlt: "Spool of black PETG-CF carbon fiber filament next to a 3D printed mechanical bracket"
tags: ["3D Printing"]
draft: false
faq:
  - question: "Is PETG-CF stronger than regular PETG?"
    answer: "Yes, but in specific ways. PETG-CF has roughly 2-3x the stiffness (Young's modulus) of regular PETG, and slightly better tensile strength. The carbon fibers act as reinforcement. However, it's also more brittle, so it's better for rigid structural parts than parts that need to flex or absorb impact."
  - question: "Do I need a hardened nozzle for PETG-CF?"
    answer: "Yes, absolutely. Carbon fiber particles are abrasive and will destroy a standard brass nozzle within 200-500g of printing. A hardened steel nozzle (or ruby/diamond-coated for extreme use) is mandatory. Hardened steel nozzles cost $15-30 each and last for years with carbon-fiber filaments."
  - question: "What are the best print settings for PETG-CF?"
    answer: "Nozzle 240-260°C, bed 70-90°C, print speed 30-50 mm/s for quality (faster works but with quality loss), part cooling 20-40% (less than regular PETG), and 4+ walls for structural parts. Dry the filament before printing, PETG-CF is hygroscopic and absorbs moisture quickly."
  - question: "Can I use PETG-CF on a Bambu A1 Mini or similar entry printer?"
    answer: "Yes, but with a hardened steel nozzle upgrade. The Bambu A1 Mini, A1, and P1 series can all print PETG-CF after the nozzle swap. The X-series (X1C, P1S, X2D) ship with hardened nozzles already and can print PETG-CF out of the box."
---

PETG-CF is one of those materials that gets oversold by manufacturers and undersold by 3D printing forums. The reality is somewhere in between: it's a useful filament for a specific category of prints, but it's not a magic upgrade over regular PETG for everything.

Here's what PETG-CF actually is, when it's worth the cost, and how to print it without destroying your printer.

## What Is PETG-CF?

PETG-CF is PETG (Polyethylene Terephthalate Glycol) with chopped carbon fiber added to the polymer. The carbon fibers are short, typically 100-300 microns, and they act as reinforcement that increases stiffness and dimensional stability.

Most PETG-CF blends contain 10-20% carbon fiber by weight. Higher percentages exist but get harder to print and offer diminishing returns.

The visual giveaway: PETG-CF has a matte, slightly textured finish in any color you print it in, instead of the glossy sheen of regular PETG. Black PETG-CF prints look almost like injection-molded plastic parts.

## PETG-CF vs Regular PETG: The Real Differences

| Property | Regular PETG | PETG-CF |
|----------|--------------|---------|
| **Stiffness (Young's modulus)** | ~2.1 GPa | ~5-7 GPa |
| **Tensile strength** | ~50 MPa | ~55-65 MPa |
| **Impact resistance** | High (flexible) | Lower (more brittle) |
| **Dimensional stability** | Good | Excellent (less warping, less shrinking) |
| **Surface finish** | Glossy | Matte, professional |
| **Print difficulty** | Easy | Moderate |
| **Nozzle wear** | None (use brass) | High (hardened steel required) |
| **Price per kg** | $20-25 | $40-60 |

The headline number that gets oversold is "stiffness". A 3x stiffer material sounds amazing, and for parts that need to hold their shape under load, it genuinely is. But that same stiffness means the part won't flex when something hits it. PETG-CF parts crack where regular PETG parts would bend.

If you're printing a tool holder, a bracket, or a structural mount, PETG-CF is better. If you're printing a hinge, a clip, or anything with a snap-fit, regular PETG holds up better in real-world use.

## When to Use PETG-CF

**Good use cases:**

- **Structural brackets and mounts** that need to resist deflection under load
- **Drone frames** where weight matters but stiffness is critical
- **Camera rigs and tripod plates** where flex causes blurry shots
- **Tool holders** that need dimensional stability over years
- **Jigs and fixtures** for workshops where precision matters
- **Replacement parts** for industrial equipment

**Bad use cases:**

- **Snap-fit enclosures** (PETG-CF cracks at thin walls under repeated flex)
- **Living hinges** (the carbon fibers create stress concentration points)
- **Living-strain components** (PETG-CF tolerates static load well but fails under repeated dynamic load)
- **Parts that need to absorb impact** (drops, vibration cycling, TPU or regular PETG are better)
- **Cosmetic prints** where the matte finish doesn't fit the design

For a refresher on choosing materials in general, see our [PLA vs PETG vs ABS comparison](/pla-vs-petg-vs-abs/).

## Print Settings That Actually Work

Different brands have slightly different specs, but these settings get you 90% of the way for almost any PETG-CF filament:

### Temperature

- **Nozzle:** 240-260°C
- **Bed:** 70-90°C
- **Chamber:** Not required, but a passive enclosure (or active heat to 35-45°C in winter) improves layer adhesion

### Speed and Cooling

- **Print speed:** 30-50 mm/s for quality parts
- **Inner walls:** Can go 60-80 mm/s with little quality loss
- **Travel speed:** Standard (200+ mm/s)
- **Part cooling fan:** 20-40% (not the 100% you'd use for PETG; carbon fiber needs less cooling for proper layer adhesion)
- **First layer fan:** 0% (always)

### Mechanical Settings

- **Walls/perimeters:** 4 for structural parts, 3 for decorative
- **Infill:** 30-40% (PETG-CF parts are stiff enough that more infill rarely helps)
- **Infill pattern:** Gyroid or cubic for isotropic strength
- **Top/bottom layers:** 5-6 for a clean finished surface

### Bed Adhesion

- Use a PEI sheet or glass with glue stick
- No raft needed
- Brim helps for tall thin parts
- Z-offset slightly higher than regular PETG (carbon fiber doesn't squish as easily)

## Hardware Requirements

This is where PETG-CF separates from regular PETG and where most people get caught off guard.

### Hardened Steel Nozzle (Mandatory)

Carbon fiber particles are abrasive. A brass nozzle is rated for non-abrasive filaments only. Printing PETG-CF through a brass nozzle wears it out within 200-500 grams of filament. The nozzle diameter grows over time, ruining dimensional accuracy.

**Solution:** Swap to a **hardened steel nozzle** (~$15-30). Brands like E3D, Bondtech, MicroSwiss, and Bambu Lab all sell them. For extreme use cases, ruby or diamond-coated nozzles exist at higher prices.

Most modern Bambu Lab X-series printers (X1C, P1S, X2D) ship with hardened nozzles already. Entry-level printers (A1 series, basic Ender, etc.) need the swap.

### Filament Drying

PETG-CF is more hygroscopic than regular PETG. The carbon fibers absorb moisture from the air and trap it in the polymer. Wet filament prints with pops, snaps, and stringing.

**Solution:** Dry the filament before every print at 65°C for 4-6 hours in a filament dryer. Store in a sealed container with desiccant when not in use.

See our [must-have 3D printing accessories](/must-have-3d-printing-accessories/) for filament dryer recommendations.

### Wear Parts Everywhere

Beyond the nozzle, carbon fiber wears out other components over time:

- **PTFE tubing:** Lasts ~1-2 kg before replacement
- **Extruder gears:** Hardened steel gears last 5-10x longer than standard
- **Hot end heat break:** Bi-metal heat breaks resist abrasion better

For occasional PETG-CF prints (under 1 kg per year), don't worry about anything beyond the nozzle. For heavy production, budget for replacement parts.

## Best PETG-CF Brands in 2026

Based on community reviews and personal testing:

**Premium tier ($45-60/kg):**
- **Polymaker PolyMax PETG-CF**, Most consistent quality, excellent dimensional accuracy
- **Prusament PETG Carbon**, Top European brand, slightly stiffer than Polymaker

**Mid tier ($30-45/kg):**
- **Bambu Lab PETG-CF**, Excellent integration with Bambu printers, RFID-tagged
- **eSun ePA-CF** (technically Nylon-CF, often grouped), Different polymer but similar use case

**Budget tier ($25-35/kg):**
- **Sunlu PETG-CF**, Acceptable for non-critical prints, more variable quality
- **Various AliExpress**, Lottery; some are great, some are awful. Test before committing to a project.

## Cost Analysis: When PETG-CF Is Worth It

A 1 kg spool of PETG-CF costs roughly **2-3x what regular PETG costs**. Plus the one-time cost of a hardened nozzle ($15-30) and possible filament dryer ($60-120) if you don't have one.

Break-even analysis:

- **Tool holder you print once:** Use regular PETG, save the money
- **Bracket for a custom monitor mount:** PETG-CF is worth it for the rigidity and clean finish
- **Production parts for a small business:** PETG-CF if the customer pays for the upgrade
- **Drone parts (weight-critical):** PETG-CF is often the right answer despite the cost
- **Replacement parts for industrial equipment:** PETG-CF for dimensional stability over time

A useful rule of thumb: if the part is going to be visible and load-bearing, PETG-CF is worth the upgrade. If it's hidden or non-structural, regular PETG works fine.

## Common Problems and Fixes

**Stringing and ooze:** Increase retraction distance by 1-2 mm. Lower the nozzle temperature by 5-10°C. Dry the filament.

**Layer separation:** Increase nozzle temperature by 5-10°C. Reduce part cooling fan. Ensure the chamber is warm (passive enclosure helps).

**Brittle prints:** Often a sign of over-dried filament or too-cold printing. PETG-CF should still have some toughness. If it shatters from any pressure, something is off.

**Rough surface:** PETG-CF has a naturally matte finish, but excessive roughness usually means under-extrusion (raise nozzle temp or reduce print speed) or worn nozzle (replace it).

**Warping:** PETG-CF warps less than regular PETG, but tall thin parts can still pull off the bed. Add a brim, raise bed temperature, or print inside a passive enclosure.

## Verdict

PETG-CF is a real upgrade over regular PETG for specific structural applications. It's not magic, it costs more, requires hardware upgrades, and behaves differently. Most hobbyists don't actually need it for the prints they're doing.

But if you're making something that holds a load, needs to keep its shape, or has to look professional, PETG-CF earns the cost. Pair it with a hardened nozzle and a dry filament habit and it'll print as reliably as regular PETG, just with better mechanical properties.

For more on which filaments to use when, see our [PLA vs PETG vs ABS guide](/pla-vs-petg-vs-abs/) and [must-have 3D printing accessories](/must-have-3d-printing-accessories/) roundup.

## Related Reading

- [PLA vs PETG vs ABS: Material Comparison](/pla-vs-petg-vs-abs/)
- [Bambu Lab X2D Review](/bambu-lab-x2d-first-look/)
- [Must-Have 3D Printing Accessories](/must-have-3d-printing-accessories/)
- [3D Printing Beginners Guide](/3d-printing-beginners-guide/)
- [Best 3D Printers Under $300](/best-3d-printers-under-300/)


