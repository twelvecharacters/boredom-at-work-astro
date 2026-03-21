---
title: "Sesame Robot: The Most Adorable DIY Quadruped You Can 3D Print"
slug: "sesame-robot-quadruped"
description: "Meet Sesame, the open-source quadruped robot that brings personality and complex movement to the world of DIY 3D printing. Perfect for makers and robotics enthusiasts."
publishDate: 2026-03-22
author: "bored chap"
image: "/images/sesame-robot.webp"
tags: ["3D Printing", "Robotics", "DIY", "ESP32", "Open Source"]
draft: false
faq:
  - question: "How much does it cost to build a Sesame Robot?"
    answer: "The total cost for components (servos, ESP32, OLED, battery) is typically between $50 and $60, assuming you already have a 3D printer and filament."
  - question: "Do I need special filament for the Sesame Robot?"
    answer: "No, the design is optimized for standard PLA. It's printer-friendly and requires minimal supports."
  - question: "Is soldering required for the Sesame Robot?"
    answer: "Yes, basic soldering skills are needed to connect the servos, display, and power system to the ESP32 microcontroller."
tldr: "If you're looking for a project that combines 3D printing, electronics, and personality, the Sesame Robot is it. For under $60, you can build a fully functional, emotive quadruped robot powered by an ESP32."
isListicle: false
---

If you've been following our [3D Printing Guide for Beginners](/3d-printing-guide/), you've probably reached the stage where you're tired of printing static "dust collectors." You want something that moves, something interactive, and—let's be honest—something that looks cool on your desk.

Enter the **Sesame Robot**.

Created by [dorianborian](https://github.com/dorianborian/sesame-robot), Sesame is an open-source, 8-servo quadruped robot that is taking the maker community by storm. It's not just a walking machine; it's a personality-driven companion designed to be accessible to everyone.

## What Makes Sesame Special?

Most quadruped robots are either incredibly expensive (thousands of dollars) or extremely complex to build. Sesame hits the "goldilocks" zone of robotics:

1.  **Affordability:** You can source all the electronics for roughly **$50–$60**.
2.  **Expressiveness:** A small SSD1306 OLED display acts as Sesame's face, allowing it to blink, look around, and express emotions.
3.  **Ease of Printing:** The parts are meticulously designed for FDM printers. If you've mastered your [Cura Settings](/cura-settings-beginners/), you'll have no trouble getting clean, functional parts in PLA.

## The Brains: ESP32 Power

At the heart of Sesame is the **ESP32-S2 Mini**. This choose is brilliant for several reasons. It's cheap, powerful, and features built-in WiFi. 

Because it has WiFi, you don't just program it and hope for the best. You can control Sesame directly from a web interface, a mobile app, or even script complex movements using **Sesame Studio**—a dedicated web tool for creating animations.

## Build Requirements (BOM)

To bring your own Sesame to life, you'll need:

*   **8x MG90S Servos:** These metal-gear micro servos provide the muscle for the legs.
*   **ESP32-S2 Mini:** The microcontroller that coordinates everything.
*   **0.96" OLED Display:** For those emotive eyes.
*   **3S LiPo Battery:** To keep Sesame walking for a decent amount of time.
*   **3D Printed Parts:** Roughly 200-300g of PLA filament.

## Is it Hard to Build?

We'd rate the assembly as **Moderate**. 

While the 3D printing is straightforward, you will need to do some basic soldering to connect the servos and display. However, the documentation on GitHub is excellent, with clear wiring diagrams and step-by-step guides.

If you're looking for high-quality files to start with, Sesame is one of the top projects we recommend checking out on the [Best Sites for Free 3D Models](/best-sites-free-3d-models/).

## Why You Should Build One

3D printing is at its best when it merges with other disciplines like electronics and programming. Sesame is the perfect "next step" project. It teaches you about power management, servo calibration, and kinematic movement, all while resulting in a robot that feels genuinely alive.

Plus, watching it do a little "happy dance" on your desk after you've spent an afternoon building it is one of the most rewarding feelings in the maker hobby.

**Ready to start?** Head over to the [Sesame Robot GitHub repository](https://github.com/dorianborian/sesame-robot) and start warming up your heat bed.
