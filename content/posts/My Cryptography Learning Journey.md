---
title: "My Cryptography Learning Journey"
date: 2023-12-20T00:00:00
lastmod: 2025-12-08 18:35:24
tags: ["cryptography", "RSA", "Diffie-Hellman", "security"]
categories: ["Guide"]
draft: false
---
This post documents my personal journey of learning cryptography. I’ve curated and organized the exact resources, videos, and concepts I used—starting from foundational math to public key cryptography. If you're someone starting out or struggling with the core ideas, this learning path might give you the clarity and structure you need.

## 1. Cryptography Fundamentals

First, I built my foundation with these resources:
- <a href="https://chatgpt.com/share/693511cd-02f0-8003-94e3-0db86013118f" target="_blank">ChatGPT Thread for Introduction to Cryptography →</a> Read this to kickstart.

## 2. Cryptography Basics

These videos helped me understand core concepts:
- Crypto Basics Part 1  
  {{< youtube 6_Cxj5WKpIw >}}
  
- Crypto Basics Part 2  
  {{< youtube Xb4_VT4y9kQ >}}

- For Cryptography Mathematics (including Modular Arithmetic, Prime Numbers, GCD, Euler's Totient Functions or Theorems, Fermat's Theorems, Groups, Fields and etc.) Just go and <a href="https://www.youtube.com/playlist?list=PLBlnK6fEyqRjjeHdm0cwu6E-nhhEluuVA" target="_blank">Watch Cryptography Mathematics Playlist →</a>

## 3.0 RSA Prerequisites (Math Fundamentals)

### Modular Exponentiation
When an exponent is very large, you **cannot calculate (a^b) directly**, so you apply modular arithmetic shortcuts. The method you choose depends on the type of modulus and numbers involved.

1. If nothing special → use **Fast Modular Exponentiation**.
2. If modulus is prime → **use Fermat’s Little Theorem** to reduce exponent.
3. If modulus non-prime but gcd(a, m) = 1 → **use Euler’s Totient** to reduce exponent.
4. If modulus is composite and factorable → **use CRT** to break and recombine.
5. If exponent is a power tower → **reduce exponent first**, then compute using fast mod exponentiation.

<a href="https://chatgpt.com/s/t_6928109ddde88191933088b85a49476c" target="_blank">ChatGPT Thread for Modular Exponentiation →</a>
For better understaind: 


- Only video you may need:
  {{< youtube r5_65lLtHkA >}}

Now, extra videos for more clarity:
- Fast Modular Exponentiation Part 1
  {{< youtube 8r4-5k-o1QE >}}
- Fast Modular Exponentiation Part 2
  {{< youtube 1ozP3lEnCjU >}}
<!-- 
### Additional math resources:
- Modular Arithmetic Part 1
  {{< youtube M42uDLGRSpI >}}
  
- Modular Arithmetic Part 2
  {{< youtube P7P03gg3msE >}}
  
- Modular Arithmetic Part 3 - Modular Exponentiation
  {{< youtube _gYUlvcnjs0 >}}
  
- Discrete Logarithm Problem
  {{< youtube za9azzh4v9A >}}
  
- Euler's Totient Function Part 1
  {{< youtube DwQ7-k9LkJ4 >}}
  
- Euler's Totient Function Part 2
  {{< youtube osge0_lZTaY >}}
  
- Euler's Theorem Explained  
  {{< youtube DyOv20d4c70 >}}

- Primitive Roots  
  {{< youtube DKy98FWHwdg >}} -->


## 3.1 Public Key Cryptography

Understanding public/private keys:
- Public Key Cryptography Explained  
  {{< youtube GSIDS_lvRv4 >}}

## Diffie-Hellman & RSA
Just trust me, and watch the full playlist below:
<br>
<a href="https://www.youtube.com/playlist?list=PLbg3ZX2pWlgLoapF5VvM_8h5OR-XW9pbr" target="_blank">Watch Complete RSA Playlist →</a>

To calculate any of `e` or `d` if any of them is given, let's say `e` is given but not `d` or vice versa, also we know φ(n) then <a href="https://chatgpt.com/share/6936cb49-c710-8003-9688-a6858a87869cr" target="_blank">ChatGPT Thread for e or d calculation →</a>

---

## Symmetric Cryptography
### Fiestel Cipher
{{< youtube FGhj3CGxl8I >}}

### Modes of Operation
{{< youtube Rk0NIQfEXBA >}}

---

This learning path helped me build a solid understanding of these complex cryptographic concepts. I hope it can help others too!