---
name: reference-nano-banana-prompt
description: "Prompt Nano Banana validé pour remplacer un bijou sur photo lifestyle en conservant grain, colorimétrie et texture de la photo originale"
metadata: 
  node_type: memory
  type: reference
  originSessionId: a8e79bfb-b4e7-4e94-a066-f16256cfe9fc
---

## Prompt validé — remplacement bijou Nano Banana

Contexte : l'utilisateur a une photo lifestyle (ex. mannequin à Saint-Tropez, lumière golden hour) et veut remplacer le bijou visible par son propre produit. Le prompt ci-dessous force l'adaptation du grain, de la colorimétrie et de la texture pour un rendu naturel.

### Template générique (adapter `[BIJOU]` et `[EMPLACEMENT]`)

> Replace the **[BIJOU]** [EMPLACEMENT] with the [BIJOU] from Image 2. The replacement must be fully integrated into the photo:
> — Match the **warm golden-hour color grading** of the scene (orange, amber, and honey tones)
> — Apply the same **film grain and texture** visible across the entire image to the [BIJOU] surface
> — Add **soft directional shadows** consistent with the sunlight coming from the upper right
> — Slightly **reduce the [BIJOU]'s sharpness and contrast** to match the overall soft-focus, hazy quality of the photo
> — The [BIJOU] should look like it was photographed in the same conditions, not composited
> — Do not add any artificial sharpening, HDR effect, or digital gloss to the [BIJOU]
> Keep the [EMPLACEMENT], skin, background, and every other element completely untouched.

---

### Variantes par type de bijou

**Bague** :
- `[BIJOU]` → `ring`
- `[EMPLACEMENT]` → `on the model's finger`

**Boucles d'oreilles** :
- `[BIJOU]` → `earring` (ou `earrings` si paire visible)
- `[EMPLACEMENT]` → `on the model's ear` / `on both ears`

**Collier** :
- `[BIJOU]` → `necklace`
- `[EMPLACEMENT]` → `around the model's neck`

---

### Prompt remplacement dans une scène existante (Image 1 = mon bijou, Image 2 = la scène)

> **YOUR ONLY TASK: Replace the jewelry visible in Image 2 with the exact jewelry from Image 1.**
>
> **CRITICAL — reproduce Image 1's jewelry with absolute fidelity:** every detail, shape, stone cut, metal finish, and proportion must be identical. Do not simplify, reinterpret, or redesign anything.
>
> Integration rules:
> — Match the **exact scale and perspective** of the original jewelry in Image 2 (same size relative to the scene, same viewing angle)
> — Apply the **same lighting, shadows, and reflections** as the surrounding scene in Image 2
> — Match the **film grain, texture, and color temperature** of Image 2 across the entire jewelry piece
> — If the original jewelry cast a shadow or had a reflection on the surface, reproduce it naturally with the new piece
> — The result must look like the jewelry from Image 1 was always part of the scene in Image 2, photographed in the same conditions
>
> Do not alter the background, the surface, the props, or any other element of Image 2. **Only the jewelry changes.**

---

### Prompt produit fond uni (tous bijoux)

> Place the jewelry piece from Image 1 onto the background of Image 2 as a **standalone product shot**. **CRITICAL: Reproduce the exact jewelry piece from Image 1 with absolute fidelity — every detail, shape, material, stone, and finish must be identical. Do not simplify, alter, or reinterpret the design in any way.** Position the piece upright and centered, slightly angled to best showcase its structure and details. **Scale it up to fill at least 70% of the frame** for a high-quality editorial product photo. The jewelry must be razor sharp with maximum detail visible. Add a soft natural drop shadow beneath the piece to give it depth and ground it on the surface. Adapt the jewelry's lighting and reflections to match the **warm sandy beige, softly lit background of Image 2**. Keep the exact same background — no gradients, no textures added. The final result should look like a luxury jewelry campaign product image.

---

### Conseil général
- Image du produit : fond blanc ou neutre, bien éclairée
- Masquer uniquement le bijou à remplacer, pas la peau autour
- Si lumière froide (studio) : remplacer "warm golden-hour" par "cool neutral studio lighting"
