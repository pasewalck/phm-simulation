
export interface FourierQualityPreset {
    name: string;
    internalResolution: number;
    displayResolution: number;
}

export const quiltyPresets: FourierQualityPreset[] = [
    {
        name: "Schlecht",
        internalResolution: 0.2,
        displayResolution: 0.05
    },
    {
        name: "Normal",
        internalResolution: 0.1,
        displayResolution: 0.01
    },
    {
        name: "Besser",
        internalResolution: 0.01,
        displayResolution: 0.005
    },
    {
        name: "Gut",
        internalResolution: 0.005,
        displayResolution: 0.002
    }
];
