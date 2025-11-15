export const LABEL_MAP: Record<string, string> = {
  original_tea: 'Original Tea',
  tea_latte: 'Tea Latte',
  brown_sugar_bubble: 'Brown Sugar Bubble',
  popular: 'Popular',
  fresh_fruit_tea: 'Fresh Fruit Tea',
  taro_balls: 'Taro Balls',
  summer_specials: 'Summer Specials',
  yakult: 'Yakult',
  // add more known mappings here as needed
};

export function labelToText(label?: string) {
  if (!label) return 'All Bubble Teas';
  if (LABEL_MAP[label]) return LABEL_MAP[label];
  // fallback: replace underscores and title-case
  return label
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}
