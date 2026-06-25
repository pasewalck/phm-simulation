While studying for my exams at TU Berlin, after seeing [this Video](https://www.youtube.com/watch?v=spUNpyF58BY) by 3Blue1Brown, I was inspired to recreate the animations shown there.

See a [demo here](https://pasewalck.github.io/phm-simulation-dist/)! But I'd really recommend to check out the video by 3Blue1Brown first to better understand what my approach here is and also to support their amazing work!

I use the following formula for the Fourier series:

$$f(t) = \sum_{n=-\infty}^{\infty} c_n e^{i\omega_n t}$$

with $c_n = \dfrac{1}{T} \int_{0}^{T} f(t) e^{i\omega_n t}$ and $\omega_n = n \dfrac{2 \pi}{T}$.

For my calculations, I keep $T = 2 \pi$ to simplify things. Also, I only calculate the coefficients from n = -20 to 20 (optionally more) as my approach is a numerical approach, which has its limits.

Most of the interesting action happens in `src/core/fourier-series.ts`. I calculate the coefficients $c_n$ using numerical integrations. I compile the real and imaginary parts for coefficients using the following code:

```typescript
var realPartSum = 0
var imaginaryPartSum = 0
var step = resolution / n
var counter = 0
for (var t = 0; t >= - 2 * Math.PI; t -= step) {
    const realPart = Math.cos(t * n) * fn(t)
    const imaginaryPart = Math.sin(t * n) * fn(t)
    realParts.push(realPart)
    imaginaryParts.push(imaginaryPart)
    realPartSum += realPart
    imaginaryPartSum += imaginaryPart
    counter++
}
// There is no need to also divide by 2 PI here, as the method used for integration here already accounts for that.
var realPart = realPartSum / counter
var imaginaryPart = imaginaryPartSum / counter
```

This calculation can then be visualized (in steps) in the complex plane. After doing some research on JavaScript libraries that would work well I quickly ended up using [p5.js](https://p5js.org/). I ended up setting somewhat universal code for rendering different types of plots with animations and plan on using it for further visualisations in the future.

See the result below for a sawtooth function:

<img width="502" height="507" alt="image" src="https://github.com/user-attachments/assets/597fd08a-cfd7-4c71-9c73-09b0874daace" />

Also, the further I visualize the coefficients magnitude, the further I draw the full Fourier series for all calculated coefficients. See the result below for a sawtooth function:

<img width="503" height="294" alt="image" src="https://github.com/user-attachments/assets/0fd9b7a9-3576-4393-b3e9-b5476b67e7fa" />

At the time being, the UI is in German, but if I ever get to it, I will translate it.
