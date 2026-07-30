export type ProductBackground = {
  src: string;
  position: string;
};

export const PRODUCT_BACKGROUNDS: Record<string, ProductBackground> = {
  catalog: {
    src: "https://images.unsplash.com/photo-1764835711461-117d67799a7d?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 50%",
  },
  "complete-range": {
    src: "https://images.unsplash.com/photo-1768321917437-1f1f6ae2ad28?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 46%",
  },
  "tpu-materials": {
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 48%",
  },
  "ureshield-waterproofing-polyurea-systems": {
    src: "https://images.unsplash.com/photo-1685464196339-46a985b2049b?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 54%",
  },
  "uretherm-spray-foam-systems": {
    src: "https://images.unsplash.com/photo-1768321917437-1f1f6ae2ad28?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 46%",
  },
  "chemnate-mdi-range": {
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 50%",
  },
  "klayol-polyol-range": {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 58%",
  },
  "flexible-systems": {
    src: "https://images.unsplash.com/photo-1653601983541-a70f6f1e715b?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 52%",
  },
};

export function getProductBackground(slug: string): ProductBackground {
  return PRODUCT_BACKGROUNDS[slug] ?? PRODUCT_BACKGROUNDS.catalog;
}
