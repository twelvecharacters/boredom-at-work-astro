---
title: "RFID Record Player: The Coolest Way to Play Spotify with Physical 'Digital Vinyl'"
slug: "rfid-record-player"
description: "Discover the RFID Record Player, a DIY project that combines the tactile feel of vinyl with the convenience of Spotify. Learn how to build your own with a Raspberry Pi and 3D printing."
publishDate: 2026-03-26
author: "bored chap"
image: "/images/rfid-record-player.webp"
tags: ["3D Printing", "Raspberry Pi", "DIY", "Spotify", "Open Source"]
draft: false
faq:
  - question: "Do I need a Spotify Premium account for this project?"
    answer: "Yes, the Spotify Web API typically requires a Premium account for playback control on devices like a Raspberry Pi."
  - question: "Can I use any RFID tags?"
    answer: "The project is designed for NTAG213 NFC tags, which are affordable and small enough to fit inside record coasters."
  - question: "Is the spinning platter necessary for the music to play?"
    answer: "Technically no, but it's a key part of the 'analog' experience. The code uses a stepper motor to spin the platter whenever music is playing."
tldr: "The RFID Record Player uses RFID-tagged coasters to trigger Spotify playback on a Raspberry Pi. With a motorized platter and a functional tone arm, it's the perfect bridge between physical media and digital streaming."
isListicle: false
---

If you love the tactile experience of flipping through a record crate but hate the crackle of a scratched LP (or the price of modern vinyl), Fatih Ak has created the perfect project for you.

The **[RFID Record Player](https://github.com/fatihak/RFID-Record-Player)** is a DIY masterpiece that uses Raspberry Pi and RFID technology to turn simple drink coasters into "digital vinyl."

## The Concept: Physical Meets Digital

In an age where music is an invisible stream of data, we've lost the ritual of choosing an album, placing it on a platter, and moving the needle. This project brings that ritual back. 

Each "record" is actually a vinyl-themed coaster with a tiny NTAG213 NFC tag hidden inside. When you place the coaster on the player, an RFID reader identifies the tag and tells Spotify exactly what to play.

## How It Works

This isn't just a simple RFID trigger; the project goes the extra mile to simulate a real turntable:

1.  **The Trigger:** An RC522 RFID module reads the tag on the coaster.
2.  **The Interaction:** A Hall Effect sensor detects a magnet in the tone arm. The music only starts when you physically move the arm onto the "record."
3.  **The Visuals:** A 28BYJ-48 stepper motor spins the platter while the music is playing, giving you that classic spinning-disc aesthetic.
4.  **The Brains:** A Raspberry Pi Zero 2W handles the logic, connects to the Spotify API, and manages the hardware components.

## Building Your Own

To build this, you'll need a mix of electronics and 3D printing. If you're new to the hobby, checking out our [3D Printing Guide](/3d-printing-guide/) will help you get started with the mechanical parts.

### Hardware Checklist:
*   **Raspberry Pi Zero 2W:** Small enough to fit in the enclosure.
*   **RC522 RFID Reader:** To scan your "records."
*   **Stepper Motor (28BYJ-48):** For the spinning platter.
*   **Hall Effect Sensor (A3144E):** To detect the tone arm position.
*   **Vinyl Coasters:** Readily available on sites like Amazon or Etsy.

### Software Setup
The project comes with a handy `install.sh` script that sets up the Python environment. You'll need to create a [Spotify Developer account](https://developer.spotify.com/) to get your Client ID and Client Secret, which allows the Pi to control your playback.

## Why We Love This Project

The RFID Record Player is a perfect example of "over-engineering" in the best way possible. It doesn't just play music; it recreates the *feeling* of playing music. 

It's also highly customizable. You can map a tag to a single song, a classic album, or a dynamic playlist that changes every day. It makes a fantastic conversation piece for an office or a unique gift for a music lover.

If you're looking for your next weekend project and want to bridge the gap between your digital library and your physical space, this is it.

**Ready to start?** Download the files and check out the wiring guide on the [RFID Record Player GitHub](https://github.com/fatihak/RFID-Record-Player).
